import React from 'react';
import ButtonGroup from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import axiosInstance from '../../axios';
import ModelDropdownItems from './model_dropdown_items'
import './model_dropdown.css'

class ModelDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      modelprompt: 'Loading Models...'
    };
  }

  componentDidMount() {
    // grab models here!
    axiosInstance
      .get('/compute/models/', {})
      .then(res => {
        let modeldict = {};
        for (var i = 0; i < res.data.models.length; i++) {
          modeldict[res.data.models[i].name] = res.data.models[i].id;
        }
        this.setState({options : modeldict});
        this.setState({modelprompt : 'Select a Model'});
      })
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle 
          id='model-dropdown'
          size='lg'
          className='model'
        > 
        {this.state.modelprompt}
          </Dropdown.Toggle>
        <Dropdown.Menu className='model'>
          <ModelDropdownItems models={this.state.options}/>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default ModelDropdown;