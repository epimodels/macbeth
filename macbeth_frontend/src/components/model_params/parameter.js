import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
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
  // ref to parameter field
  const parameterRef = React.useRef(null);
  // value for parameter field
  const [value, valueDispatch] = React.useReducer(valueReducer, '');

  React.useEffect(() => {
    // get fresh params
    let paramDict = JSON.parse(localStorage.getItem('compute-selected-model-params'));
    // if the parameter is already in the dict and it's not default, set the text to that
    if (paramDict[props.variableName] !== undefined && paramDict[props.variableName] !== props.placeholder) {
      valueDispatch({ label: props.label, default: props.placeholder, params: paramDict, value: paramDict[props.variableName] });
    }
    // otherwise, have the text be nothing so the placeholder text (that holds the default value) shows
    else {
      valueDispatch({ label: props.label, default: props.placeholder, params: paramDict, value: '' });
    }
  }, [props]);
  /*
   * Reducer function for a parameter value
   * label: props.label (label/key for param)
   * default: props.placeholder (default value for param -- just in case we want to reset to default (when new value is empty))
   * value: new value
   */
  function valueReducer(value, action) {
    // To reduce unnecessary changing
    if (value !== action.value) {
      // get fresh params
      let paramDict = JSON.parse(localStorage.getItem('compute-selected-model-params'));
      // set new value in localStorage dict -- if our new value is empty, use default value instead
      paramDict[action.label] = (action.value === '') ? action.default : action.value;
      localStorage.setItem('compute-selected-model-params', JSON.stringify(paramDict));
      parameterRef.current.value = action.value;
    }
    
    return action.value;
  
  return (
    <InputGroup>
      <Form.Group className='mb-3' controlId={props.controlId}>
        <Form.Label>{props.label}</Form.Label>
        <Stack direction="horizontal" gap={2}>
        <Form.Control size='lg' 
          ref={parameterRef}
          type={props.type} 
          placeholder={props.placeholder} 
          defaultValue={value} 
          onChange={(e) => valueDispatch({ label: props.label, default: props.placeholder, value: e.target.value })} 
          // Added onSelect because onChange does not trigger when there is a defaultValue and you select all text and delete
          // See: https://stackoverflow.com/questions/66950716/react-bootstrap-component-form-control-onchange-event-listener-doesnt-fire-wh#comment126154329_66951536
          onSelect={(e) => valueDispatch({ label: props.label, default: props.placeholder, value: e.target.value })} />
        {/* Currently hides reset icon by inversing the colors to white */}
        <FontAwesomeIcon icon={faRotateLeft} id="resetField" onClick={() => valueDispatch({ label: props.label, default: props.placeholder, value: '' })} className={value === '' ? 'fa-inverse' : ''}/>
        </Stack>
        <Form.Text className="text-muted">
          {props.text}
        </Form.Text>
      </Form.Group>
    </InputGroup>
  );
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