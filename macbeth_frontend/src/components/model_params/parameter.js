import React from 'react';
import Form from 'react-bootstrap/Form'

/*
 * Parameter field
 * controlId: input's ID
 * label: text besides the field
 * type: HTML input type
 * placeholder: text inside field until something is entered
 * text: smaller text that shows below the field
 */
class Parameter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  componentDidMount() {
    const paramDict = JSON.parse(localStorage.getItem('compute-selected-model-params'));
    if (paramDict[this.props.variableName] !== undefined) {
      this.setState({text: paramDict[this.props.variableName]});
    }
  }


  onEditHandler(e) {
    console.log("onEditHandler");
    const paramDict = JSON.parse(localStorage.getItem('compute-selected-model-params'));
    paramDict[this.props.variableName] = e.target.value;
    localStorage.setItem('compute-selected-model-params', JSON.stringify(paramDict));
  }
  
  render() {
    return (
      <Form.Group className='mb-3' controlId={this.props.controlId}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control onChange={(e) => this.onEditHandler(e)} size='lg' 
          type={this.props.type} 
          placeholder={this.props.placeholder} 
          defaultValue={this.state.text} />
        <Form.Text className="text-muted">
          {this.props.text}
        </Form.Text>
      </Form.Group>
    )
  }
}

Parameter.defaultProps = {
  controlId: 'default',
  label: 'Default',
  type: 'basicDefault',
  placeholder: 'Enter info here',
  text: '',
  variableName: '',
}

export default Parameter;