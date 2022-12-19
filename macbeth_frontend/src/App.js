import React from 'react';
import { Outlet } from 'react-router-dom'
import './App.css';
import WebNavbar from './components/home/webnavbar'
import Footer from './components/home/footer'

export default function App() {
  return (
    <div className="App">
      <div style={{ marginBottom: '100px'}}>
        <WebNavbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
