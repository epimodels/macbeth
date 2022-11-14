import React from 'react';
import './compute.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import useLocalStorage from '../useLocalStorage';
import ModelDropdown from '../model_select/model_dropdown';
import ParameterEdit from '../model_params/parameter_edit';
import Results from '../model_results/results';
import NavButton from '../nav_button';

/*
 * Base page for Compute
 */
export default function Compute() {
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

  // This is done so that way generateGraph is detected as changed when the button is clicked, and it can be reclicked to regenerate the graph
  React.useEffect(() => {
    if (generateGraph)
    {
      setGenerateGraph(false);
    }
  }, [generateGraph]);

  return (
    <div>
      <Container>
        <Row style={{"marginTop":"5%"}}>
          <Col>
            <Stack gap={5}>
              <Results generateGraph={generateGraph} modelName={modelName} modelID={modelID} modelParams={modelParams} modelGraphing={modelGraphing} />
              <NavButton label="Generate Graph" clickEvent={GraphClick} />
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