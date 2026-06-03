import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Search from './components/Search'
import LayoutCard from './components/LayoutCard'
import MovieDetail from './pages/MovieDetail'
import WatchlistForm from './components/WatchlistForm'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        {/* Home Page */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
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
            isLoggedIn ? (
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