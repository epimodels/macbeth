import React from 'react';
import './App.css';
import WebNavbar from './components/webnavbar'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
      return (
      <div className="App">
        <WebNavbar />
        <header className="App-header">
          
        </header>
      </div>
    );
  }
}

export default App;
