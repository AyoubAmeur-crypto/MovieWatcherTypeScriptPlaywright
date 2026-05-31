import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Search from './components/Search'
import LayoutCard from './components/LayoutCard'
import MovieDetail from './pages/MovieDetail'

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Page */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white">
              <Navbar />
              <Hero />
              <Search />
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
