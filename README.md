# MovieWatcher

A modern movie discovery and exploration application built with React, TypeScript, and Vite. Browse thousands of movies, search by title, explore detailed information, and manage your watchlist.

## Features

- Browse popular and trending movies
- Search movies by title with real-time results
- Detailed movie information pages with ratings and descriptions
- Responsive design for mobile, tablet, and desktop devices
- Beautiful dark-themed UI with premium styling
- Smooth animations and transitions
- Pagination for movie browsing
- Movie ratings and metadata display
- Wishlist functionality for saving favorites

## Tech Stack

### Current Technologies
- React 18+ with TypeScript
- Vite (build tool and dev server)
- React Router DOM (client-side routing)
- Zustand (state management)
- Tailwind CSS (utility-first styling)
- The Movie Database (TMDB) API

### Planned Technologies
- TanStack Query (data fetching and caching)
- Playwright (end-to-end testing)

## Getting Started

### Prerequisites
- Node.js 16+ or higher
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/MovieWatcher.git
   cd MovieWatcher
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Add your TMDB API key:
     ```
     VITE_TMDB_API_KEY=your_api_key_here
     ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
  components/          # Reusable React components
    Navbar.tsx        # Navigation bar with responsive menu
    Hero.tsx          # Landing hero section
    Search.tsx        # Movie search component
    MovieCard.tsx     # Individual movie card component
    Pagination.tsx    # Pagination controls
    LayoutCard.tsx    # Movie grid layout
  pages/              # Page components
    MovieDetail.tsx   # Movie detail page with full information
  customHooks/        # Custom React hooks
    useFetch.tsx      # API fetching hook
  zustand/            # State management stores
    movieStore.ts     # Global movie state
  types/              # TypeScript type definitions
    movie.ts          # Movie-related interfaces
```

## API Integration

This application uses The Movie Database (TMDB) API for fetching movie data. You'll need to:

1. Sign up at [TMDB](https://www.themoviedb.org/)
2. Generate an API key from your account settings
3. Add the API key to your environment variables

## UI/UX Highlights

- Premium dark theme with gold accents
- Smooth hover animations and transitions
- Responsive grid layouts (1-6 columns based on screen size)
- Mobile-first design approach
- Collapsible mobile menu
- Gradient overlays and backdrop blur effects
- Loading states with animated spinners

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request for any improvements.

## Business Inquiries

For business inquiries, partnerships, or collaboration opportunities, please reach out:

- Email: ayoubameur.tech@gmail.com
- LinkedIn: [linkedin.com/in/ayoub-ameur-772a70362](https://www.linkedin.com/in/ayoub-ameur-772a70362/)

## License

This project is open source and available under the MIT License.

## Acknowledgments

- The Movie Database (TMDB) for providing the movie API
- Vite for the fast development environment
- React community for excellent libraries and tools
