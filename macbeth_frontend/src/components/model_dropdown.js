import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './model_dropdown.css'

class ModelDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <DropdownButton 
        id='model-dropdown'
        title='Select a Model'
        size='lg'
      >
        <Dropdown.Item href="#/action-1">Model 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Model 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Model 3</Dropdown.Item>
      </DropdownButton>
    );
  }
}

export default ModelDropdown;