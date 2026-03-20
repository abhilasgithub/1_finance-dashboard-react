import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f0f4f8', minHeight: '100vh' }}>
      <header style={{ background: 'linear-gradient(135deg, #1a365d, #2b6cb0)', color: 'white', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <h1 style={{ fontSize: '1.8rem' }}>💰 Finance Dashboard</h1>
        <span style={{ opacity: 0.8 }}>Track your money, grow your wealth</span>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
