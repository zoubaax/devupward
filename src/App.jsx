import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#08090C] text-[#F3F4F6] relative overflow-x-hidden font-sans selection:bg-[#FF5500]/25 selection:text-[#FF8844]">
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
