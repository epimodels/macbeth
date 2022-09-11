import React from 'react';
import Form from 'react-bootstrap/Form';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

/*
 * Parameter field
 * controlId: input's ID
 * label: text besides the field
 * type: HTML input type
 * placeholder: text inside field until something is entered
 * text: smaller text that shows below the field
 */
function Parameter(props) {
  let paramDict = JSON.parse(localStorage.getItem('compute-selected-model-params'));
  // value for parameter field
  const [value, valueDispatch] = React.useReducer(valueReducer, '');

  React.useEffect(() => {
    // refresh params
    paramDict = JSON.parse(localStorage.getItem('compute-selected-model-params'));
    // if the parameter is already in the dict and it's not default, set the text to that
    if (paramDict[props.label] !== undefined && paramDict[props.label] != props.placeholder) {
      valueDispatch({ label: props.label, default: props.placeholder, params: paramDict, value: paramDict[props.label] });
    }
    // otherwise, have the text be nothing so the placeholder text (that holds the default value) shows
    else {
      valueDispatch({ label: props.label, default: props.placeholder, params: paramDict, value: '' });
    }
  }, []);

  /*
   * Reducer function for a parameter value
   * label: props.label (label/key for param)
   * default: props.placeholder (default value for param -- just in case we want to reset to default (when new value is empty))
   * value: new value
   */
  function valueReducer(value, action) {
    console.log("changing to: " + action.value);
    // refresh params
    paramDict = JSON.parse(localStorage.getItem('compute-selected-model-params'));
    // set new value in localStorage dict -- if our new value is empty, use default value instead
    paramDict[action.label] = (action.value == '') ? action.default : action.value;
    localStorage.setItem('compute-selected-model-params', JSON.stringify(paramDict));
    
    return action.value;
  }
  
  return (
    <Form.Group className='mb-3' controlId={props.controlId}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control size='lg' 
        type={props.type} 
        placeholder={props.placeholder} 
        defaultValue={value} 
        onChange={(e) => valueDispatch({ label: props.label, default: props.placeholder, value: e.target.value })} 
        // Added onSelect because onChange does not trigger when there is a defaultValue and you select all text and delete
        // See: https://stackoverflow.com/questions/66950716/react-bootstrap-component-form-control-onchange-event-listener-doesnt-fire-wh#comment126154329_66951536
        onSelect={(e) => valueDispatch({ label: props.label, default: props.placeholder, value: e.target.value })} />
      <Form.Text className="text-muted">
        {props.text}
      </Form.Text>
    </Form.Group>
  );
}

Parameter.defaultProps = {
  controlId: 'default',
  label: 'Default',
  type: 'basicDefault',
  placeholder: 'Enter info here',
  text: ''
}

export default Parameter;