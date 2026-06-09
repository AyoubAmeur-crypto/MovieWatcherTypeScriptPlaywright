# 🎭 Professional E2E Testing with Playwright & Page Object Model (POM)

This directory contains an enterprise-level test suite designed with industry best practices. It showcases **clean architecture**, **the Page Object Model (POM)**, and **global authentication state reuse** (the standard way top engineering teams write tests).

---

## 🔍 Codebase Test Audit

The existing test files in the `/tests` folder have several anti-patterns that make scaling test suites difficult. Here is an analysis of the existing vs. professional testing implementation:

### 1. The Redundant Login Anti-Pattern
* **Existing approach (`/tests/e2e/watchList.spec.ts`, `/tests/e2e/homePage.spec.ts`)**: Every single test file logs in via the UI inside a `beforeEach` hook. 
* **The issue**: UI-based login takes 1-3 seconds. With 50 test files, you waste over 1.5 minutes just signing in! This slows down local development and balloons CI/CD execution costs.
* **Enterprise Solution**: Log in **once** using a dedicated setup file (`auth.setup.ts`), capture the authentication state (cookies and `localStorage`), and inject it into subsequent tests automatically.

### 2. Locator Leakage & Selector Duplication
* **Existing approach**: Every spec file hardcodes locator paths (e.g., `page.getByTestId('login-username')` or `page.getByPlaceholder(...)`).
* **The issue**: If an input placeholder or a test ID changes in the React components, you have to find and modify every single spec file.
* **Enterprise Solution**: Abstract the page elements and user flows into class-based page objects (POM). Tests only call descriptive methods (e.g., `await loginPage.login(username, password)`); selector details are hidden.

---

## 🏗️ Directory Layout

We structured `test_professional` to strictly isolate responsibilities:

```
test_professional/
├── README.md               # This architectural guide
├── auth.setup.ts           # Runs once, logs in, and saves session state
├── pages/                  # Page Objects (encapsulating locators and actions)
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   └── MovieDetailPage.ts
└── specs/                  # Test scenarios (using POM & pre-authenticated sessions)
    ├── auth.spec.ts        # Explicit login/logout validation (re-running login UI)
    ├── search.spec.ts      # Searching, pagination, and API mocking tests
    └── watchlist.spec.ts   # Watchlist add/remove tests (already logged in!)
```

---

## 🔑 Authentication Config & Enterprise Session Reuse

Instead of repeating login scripts, Playwright saves session states. Here is how we configured it for the application:

### 1. How the Auth Setup Works (`auth.setup.ts`)
1. Navigates to `/` and logs in with credentials via `LoginPage`.
2. Asserts successful redirect to the `/home` page.
3. Saves context state to `playwright/.auth/user.json`.
4. Playwright project config is configured to make all tests depend on this setup project.

### 2. How to Update `playwright.config.ts`
To enable this global authentication reuse, configure your `playwright.config.ts` by adding a setup project and loading the storage state:

```typescript
import { defineConfig, devices } from '@playwright/test';

// Define the path for the saved auth state
const STORAGE_STATE = 'playwright/.auth/user.json';

export default defineConfig({
  // Point to the professional folder
  testDir: './test_professional',
  
  fullyParallel: true,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // 1. Setup Project (runs first to authenticate)
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    // 2. Main Test Projects (depend on setup and load saved storage state)
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE, // Inject authenticated cookies/localStorage
      },
      dependencies: ['setup'], // Forces 'setup' to run before tests in this project
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});
```

---

## ⚡ How to Run the Professional Test Suite

You can execute the professional suite using the Playwright CLI:

### Run all tests (including the auth setup):
```bash
npx playwright test --config=playwright.config.ts
```

### Run in UI Mode:
```bash
npx playwright test --ui
```

### Run only watchlist tests (pre-authenticated):
```bash
npx playwright test test_professional/specs/watchlist.spec.ts
```
*(Notice how the browser launches directly onto the home page, logged in, completely bypassing the login page!)*
