import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#000000] text-white relative overflow-x-hidden font-sans selection:bg-white selection:text-black">
        {/* Global Minimal Floating Navbar */}
        <Navbar />

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
