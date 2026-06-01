import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <Router>
      <Routes>
        {/* Main Page */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white">
              <Navbar onLogout={handleLogout} />
              <Hero />
              <Search />
              <WatchlistForm />
              <LayoutCard />
            </div>
          }
        />

        {/* Movie Detail Page */}
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  )
}

export default App
