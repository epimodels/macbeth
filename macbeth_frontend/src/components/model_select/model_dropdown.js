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
    this.allowNext = this.props.allowNextEvent;
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
        this.setState({options : modeldict});
        this.setState({modelprompt : 'Select a Model'});
        if(localStorage.getItem('compute-selected-model') !== null) {
          this.setState({modelprompt : localStorage.getItem('compute-selected-model-name')});
          this.allowNext();
        }
      })
  }

  handleChange(e) {
    this.setState({modelprompt: e.target.innerText});
    const prevmodelID = localStorage.getItem('compute-selected-model');
    console.log(e.target.id);
    // If the model is new
    if(prevmodelID !== e.target.id) {
      localStorage.setItem('compute-selected-model', e.target.id);
      localStorage.setItem('compute-selected-model-name', e.target.innerText);
      localStorage.setItem('compute-selected-model-params', JSON.stringify({}));
    }
    this.allowNext();
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