import React from 'react';
import './App.css';
import WebNavbar from './components/webnavbar'
import Footer from './components/footer'
import SignIn from './components/signin'

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
        <SignIn />
        <header className="App-header">
          
        </header>
        
        <Footer />
      </div>
    );
  }
}

export default App;
