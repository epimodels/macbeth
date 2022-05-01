import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import axiosInstance from '../../axios';
import ModelDropdownItems from './model_dropdown_items'
import './model_dropdown.css'

class ModelDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      modelPrompt: 'Loading Models...'
    };
  }

  componentDidMount() {
    // grab models here!
    axiosInstance
      .get('/compute/models/', {})
      .then(res => {
        let modelDict = {};
        for (var i = 0; i < res.data.models.length; i++) {
          modelDict[res.data.models[i].name] = res.data.models[i].id;
        }
        this.setState({options : modelDict});
        this.setState({modelPrompt : 'Select a Model'});
      })
  }

  handleChange(e) {
    this.setState({modelPrompt: e.target.innerText});
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle 
          id='model-dropdown'
          size='lg'
          className='model'
        > 
        {this.state.modelPrompt}
          </Dropdown.Toggle>
        <Dropdown.Menu className='model'>
          <ModelDropdownItems onClick={(e) => this.handleChange(e)} models={this.state.options}/>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default ModelDropdown;