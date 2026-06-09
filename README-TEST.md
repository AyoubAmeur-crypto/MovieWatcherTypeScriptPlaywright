# 🎭 Tests E2E avec Playwright — MovieWatcher

## 1. Qu'est-ce que Playwright ?

**Playwright** est un framework de test **open-source** développé par Microsoft pour les **tests E2E (End-to-End)** d'applications web.

### Pourquoi Playwright est le meilleur choix ?

| Critère | Playwright | Selenium | Cypress |
|---------|-----------|----------|---------|
| **Navigateurs** | Chrome, Firefox, Safari (WebKit) | Chrome, Firefox, Safari, Edge | Chrome uniquement |
| **Langages** | JS, TS, Python, Java, .NET | Multi-langages | JS/TS uniquement |
| **Vitesse** | Très rapide (mode headless) | Lent | Rapide |
| **Auto-wait** | Intégré nativement | Manuel | Partiel |
| **Traces & Vidéos** | Intégré | Extension | Payant |
| **API Mocking** | `page.route()` intégré | Complexe | Intégré |
| **Mobile** | Émulateur intégré | Cloud uniquement | Non |

### Avantages clés de Playwright

1. **Auto-waiting automatique** — attend que l'élément soit visible/interactif avant d'agir
2. **Cross-navigateur** — un seul script pour Chrome, Firefox, Safari
3. **Mocking d'API** — interception et simulation des appels réseau sans backend
4. **Traces et vidéos** — debugging visuel en cas d'échec
5. **Page Object Model (POM)** — architecture propre et maintenable
6. **CI/CD ready** — s'intègre avec GitHub Actions, Jenkins, etc.

---

## 2. L'application testée : MovieWatcher

**MovieWatcher** est une application React + TypeScript qui permet de :

- Parcourir les films populaires (via l'API TMDB)
- Rechercher des films par titre
- Voir les détails d'un film
- Ajouter des films à une watchlist
- S'authentifier (login/logout)

### Stack technique

| Technologie | Rôle |
|-------------|------|
| React + TypeScript | Frontend |
| Zustand | State management |
| React Router | Navigation |
| Axios | Appels API TMDB |
| Vite | Build tool |

---

## 3. Structure des tests

```
tests/
├── pages/                    # Page Object Model
│   ├── LoginPage.ts          # Page de connexion
│   ├── HomePage.ts           # Page d'accueil / recherche
│   └── MovieDetailPage.ts    # Page détail d'un film
├── specs/                    # Fichiers de test
│   ├── auth.spec.ts          # Tests de connexion
│   ├── home.spec.ts          # Tests page d'accueil
│   ├── search.spec.ts        # Tests avec API mockée
│   ├── watchlist.spec.ts     # Tests watchlist
│   └── api.spec.ts           # Tests API TMDB réelle
├── auth.setup.ts             # Setup authentification
└── pages/                    # Tests supplémentaires
```

### Architecture Page Object Model (POM)

```
Tests (specs)  ──utilise──>  Pages (POM)  ──interagit──>  Application
     |                            |
     | (assertions)               | (localisateurs + actions)
     ▼                            ▼
  expect().toBeVisible()     page.getByTestId()
  expect().toBeHidden()      page.getByRole()
  expect().toBeDisabled()    page.fill() / page.click()
```

**Principe :** Les "Pages" contiennent les localisateurs et actions, les "Specs" contiennent les assertions.

---

## 4. Les tests en détail

### ✅ Tests d'authentification (`auth.spec.ts`)
- Connexion réussie avec credentials valides
- Connexion avec mot de passe invalide → message d'erreur

### ✅ Tests page d'accueil (`home.spec.ts`)
- Vérification des éléments présents
- Déconnexion
- Ouverture d'une carte film → page détails
- Test du bouton de pagination

### ✅ Tests avec API mockée (`search.spec.ts`)
- Interception des appels API TMDB avec `page.route()`
- Simulation de réponses fictives
- Test de recherche sans dépendre du vrai backend

### ✅ Tests watchlist (`watchlist.spec.ts`)
- Ajout d'un film à la watchlist
- Suppression d'un film (avec hover pour révéler le bouton)

### ✅ Tests API TMDB (`api.spec.ts`)
- Appels réels à l'API TMDB via `request.get()`
- Vérification des films populaires
- Vérification de la recherche de films

---

## 5. Setup et exécution

### Prérequis

```bash
Node.js >= 18
npm
```

### Installation

```bash
npm install
npx playwright install
```

### Configuration

Créer un fichier `.env` à la racine :

```env
VITE_TMDB_TOKEN=votre_token_tmdb
TEST_USERNAME=user1234
TEST_PASSWORD=password
TEST_WRONG_PASSWORD=mauvais_password
TRENDY_MOVIE=https://api.themoviedb.org/3/movie/popular
QUERRY_MOVIE=https://api.themoviedb.org/3/search/movie
```

### Lancer les tests

```bash
# Tous les tests
npx playwright test

# Un fichier spécifique
npx playwright test tests/specs/auth.spec.ts

# Un navigateur spécifique
npx playwright test --project=specs-chromium

# Mode UI (interface graphique)
npx playwright test --ui

# Voir le rapport HTML
npx playwright show-report
```

---

## 6. Concepts clés démontrés

| Concept | Implémentation |
|---------|---------------|
| **Page Object Model** | `tests/pages/*.ts` |
| **Mocking API** | `page.route("**/search/movie**", handler)` dans `search.spec.ts` |
| **Authentification** | `auth.setup.ts` + `storageState` |
| **Cross-navigateur** | 3 projets : chromium, firefox, webkit |
| **Tests API** | `request.get()` avec headers |
| **Traces & Vidéos** | Automatique en cas d'échec |
| **Variables d'environnement** | dotenv + `.env` |

---

## 7. Résultats

- **32 tests** passent sur 3 navigateurs (Chrome, Firefox, Safari)
- **CI/CD prêt** avec GitHub Actions
- **Temps d'exécution** : ~1 minute en parallèle
