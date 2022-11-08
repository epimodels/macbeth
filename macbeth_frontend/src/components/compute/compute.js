import React from 'react';
import { Outlet } from 'react-router-dom'
import './compute.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import useLocalStorage from '../useLocalStorage';
import ModelDropdown from '../model_select/model_dropdown';
import ParameterEdit from '../model_params/parameter_edit';

/*
 * Base page for Compute
 */
export default function Compute() {
  const [modelName, setModelName] = useLocalStorage("selected-model-name", "Select a Model");
  const [modelID, setModelID] = useLocalStorage("selected-model-id", "-1");
  const [modelParams, setModelParams] = useLocalStorage("selected-model-params", []);
  const [modelInfo, setModelInfo] = useLocalStorage("selected-model-info", {});
  const [modelGraphing, setModelGraphing] = useLocalStorage("selected-model-graphing", {});

  return (
    <div>
      <h1>Compute</h1>
      <Container>
        <Row>
          <Col>
            <Stack>
              <div>Results</div>
            </Stack>
          </Col>
          <Col>
            <Stack>
              <ModelDropdown modelName={modelName} setModelName={setModelName} modelID={modelID} setModelID={setModelID} setModelParams={setModelParams} />
              <div>Model info</div>
              <ParameterEdit modelID={modelID} modelParams={modelParams} setModelParams={setModelParams} setModelInfo={setModelInfo} setModelGraphing={setModelGraphing} />
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}