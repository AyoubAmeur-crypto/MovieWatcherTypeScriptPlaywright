import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Search from './components/Search'
import LayoutCard from './components/LayoutCard'
import MovieDetail from './pages/MovieDetail'
import WatchlistForm from './components/WatchlistForm'
import Login from './components/Login'
import { useMovieStore } from './zustand/movieStore'

function App() {
  const { isLogin, setLogin } = useMovieStore()

  const handleLogout = () => {
    setLogin(false)
  }

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={
            isLogin ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={() => setLogin(true)} />
            )
          }
        />

        {/* Home Page */}
        <Route
          path="/home"
          element={
            isLogin ? (
              <div className="min-h-screen bg-black text-white">
                <Navbar onLogout={handleLogout} />
                <Hero />
                <Search />
                <WatchlistForm />
                <LayoutCard />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Movie Detail Page */}
        <Route
          path="/movie/:id"
          element={
            isLogin ? (
              <MovieDetail />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App