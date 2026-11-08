import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#090A0F] text-[#F3F4F6] relative overflow-hidden font-sans selection:bg-[#FF5500]/30 selection:text-[#FF8844]">
        {/* Dynamic Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#FF5500]/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-[800px] -left-40 w-[500px] h-[500px] bg-orange-600/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-[2200px] -right-40 w-[600px] h-[600px] bg-[#FF5500]/10 blur-[160px] pointer-events-none rounded-full" />

        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Global Navigation */}
        <Navbar />

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes in the future, e.g. /events, /showcase, etc. */}
        </Routes>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}
