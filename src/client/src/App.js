import './style.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import React, { useState } from 'react'

//Pages
import Home from './pages/Home'
import Play from './pages/play'
import Navbar from './components/nav';
import History from './pages/songHistory'

function App() {
  const { user } = useAuthContext()

  return (
    <div className='App'>
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route 
              path="/login"
              element={!user ? <Home /> : <Navigate to="/"/>}
            />
            <Route 
              path="/" 
              element={user ? <Play /> : <Navigate to="/login"/>} 
            />
            <Route 
              path="/history"
              element={user ? <History /> : <Navigate to="/login"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
