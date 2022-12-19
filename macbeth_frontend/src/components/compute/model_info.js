import React from 'react';
import Stack from 'react-bootstrap/Stack';

export default function ModelInfo({
    modelInfo: { Author, Description }
    }) {

    return (
        <Stack>
            <h3>Model Details</h3>
            <div className="text-muted">authors</div>
            <div>{Author}</div>
            <div className="text-muted">description</div>
            <div>{Description}</div>
        </Stack>
    );
}
