import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import axiosInstance from '../../axios';
import ModelDropdownItems from './model_dropdown_items'
import './model_dropdown.css'

export default function ModelDropdown(props) {
  const [modelOptions, setModelOptions] = useState({});

  // Run first time
  useEffect(() => {
    axiosInstance
      .get('/compute/models/', {})
      .then(res => {
        console.log(res.data);
        let modelDict = {};
        for (var i = 0; i < res.data.models.length; i++) {
          modelDict[res.data.models[i].title] = res.data.models[i].id;
        }
        setModelOptions(modelDict);
      })
  }, []);

  // Run every time a new model is selected
  function handleChange(e) {
    props.setModelName(e.target.innerText);
    // If the model is new
    if(props.modelID !== e.target.id) {
      props.setModelID(e.target.id);
      props.setModelParams({});
    }
  }

  return (
    <Dropdown>
      <Dropdown.Toggle 
        id='model-dropdown'
        size='lg'
        className='model'
      > 
      {props.modelName}
        </Dropdown.Toggle>
      <Dropdown.Menu className='model'>
        <ModelDropdownItems onClick={(e) => handleChange(e)} models={modelOptions}/>
      </Dropdown.Menu>
    </Dropdown>
  );
}

/*class ModelDropdown extends React.Component {
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
        console.log(res.data);
        let modelDict = {};
        for (var i = 0; i < res.data.models.length; i++) {
          modelDict[res.data.models[i].title] = res.data.models[i].id;
        }
        this.setState({options: modelDict});
        this.setState({modelPrompt : 'Select a Model'});
        if(localStorage.getItem('compute-selected-model') !== null) {
          this.setState({modelPrompt : localStorage.getItem('compute-selected-model-name')});
          this.allowNext();
        }
      })
  }

  handleChange(e) {
    this.setState({modelPrompt: e.target.innerText});
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

export default ModelDropdown;*/