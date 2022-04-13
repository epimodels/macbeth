import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import './model_dropdown.css'

class ModelDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle 
          id='model-dropdown'
          size='lg'
          className='model'
        > 
        Select a Model
          </Dropdown.Toggle>
        <Dropdown.Menu className='model'>
          <Dropdown.Item className='model-item' eventKey="1">Model 1</Dropdown.Item>
          <Dropdown.Item className='model-item' eventKey="2">Model 2</Dropdown.Item>
          <Dropdown.Item className='model-item' eventKey="3">Model 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default ModelDropdown;