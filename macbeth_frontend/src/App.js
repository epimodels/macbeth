import React from 'react';
import { Outlet } from 'react-router-dom'
import './App.css';
import WebNavbar from './components/home/webnavbar'
import Footer from './components/home/footer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
       <WebNavbar />
       <Outlet />
       <Footer />
      </div>
    );
  }
}

export default App;
