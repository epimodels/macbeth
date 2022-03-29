import React from 'react';
import './App.css';
import WebNavbar from './components/webnavbar'
import Footer from './components/footer'
import ComputeModel from './components/compute_model'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
       <WebNavbar />
       <ComputeModel />
       <Footer />
      </div>
    );
  }
}

export default App;
