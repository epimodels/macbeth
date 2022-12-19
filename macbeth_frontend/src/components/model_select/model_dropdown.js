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
    <div>
      <h3>Model Selection</h3>
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
    </div>
  );
}
