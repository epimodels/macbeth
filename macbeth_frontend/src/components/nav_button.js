import React from 'react';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import './nav_button.css'

/*
 * Navigational button
 * label: Name of button
 * redirect: When clicked, what page to go to
 * variant: Style of button
 * size: Size of button
 */
function NavButton(props) {
  let disabled = props.disabled;
  let navigate = useNavigate();
  
  function handleClick() {
    navigate(props.redirect)
  }

  return (
    <Button 
      className={props.variant}
      size={props.size}
      onClick={handleClick}
      disabled={disabled}
    >
      {props.label}
    </Button>
  )
}

NavButton.defaultProps = {
  label: 'Button',
  redirect: '/',
  variant: 'default',
  size: 'lg',
}

export default NavButton;