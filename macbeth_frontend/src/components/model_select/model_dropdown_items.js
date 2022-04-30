
import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react';

const ModelDropdownItems = (props) => {
    const models = props.models;
    console.log(models);
    if (!models || models.length === 0)
    {
        return <p>No models found!</p>;
    }
    console.log(models);
    return (
        <React.Fragment>
            {Object.entries(models).map(([key, value]) => (
                <Dropdown.Item key={key} onClick={props.onClick} eventKey={value}>{key}</Dropdown.Item>
            ))}
        </React.Fragment>
    )
}

export default ModelDropdownItems;