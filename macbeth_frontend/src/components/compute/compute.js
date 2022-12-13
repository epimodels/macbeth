import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { Container, Row, Col, Stack } from 'react-bootstrap';

import useLocalStorage from '../useLocalStorage';
import ModelDropdown from '../model_select/model_dropdown';
import ModelInfo from './model_info';
import ParameterEdit from '../model_params/parameter_edit';
import Results from '../model_results/results';
import NavButton from '../nav_button';

import './compute.css'

/*
 * Base page for Compute
 */
export default function Compute() {

  const isLogged = localStorage.getItem('access_token') ? true : false;

  if (!isLogged) {
    window.location.href = '/account/sign-in';
  }

  const [modelName, setModelName] = useLocalStorage("selected-model-name", "Select a Model");
  const [modelID, setModelID] = useLocalStorage("selected-model-id", "-1");
  const [modelParams, setModelParams] = useLocalStorage("selected-model-params", []);
  const [modelInfo, setModelInfo] = useLocalStorage("selected-model-info", {});
  const [modelGraphing, setModelGraphing] = useLocalStorage("selected-model-graphing", {});
  const [generateGraph, setGenerateGraph] = React.useState(false);

  const GraphClick = (e) => {
    e.preventDefault();
    setGenerateGraph(true);
  };

  return (
    <Container style={{ marginBottom: '15%' }}>
      <h1>Compute</h1>
      <Container>
        <Row style={{'marginTop': '5%'}}>
          <Col>
            <Stack gap={5}>
              <ModelDropdown
                modelName={modelName}
                setModelName={setModelName}
                modelID={modelID}
                setModelID={setModelID}
                setModelParams={setModelParams}
              />
              <ModelInfo modelInfo={modelInfo} />
              <ParameterEdit
                modelID={modelID}
              modelParams={modelParams}
              setModelParams={setModelParams}
              setModelInfo={setModelInfo}
            />
            </Stack>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
