import React, { useState, useEffect } from "react";
import Blog from "../../components/dashboard/BlogQuiz";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from 'axios';

const Alerts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:50000/api/allenamento')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Errore nella richiesta API:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="mb-3">Quale è il nome del pokemon</h1>
      {data && Object.keys(data).length > 0 && ( // Check if data is not empty
      <Row>
        <img src={data.pokemonImage} alt="pro version" className="w-25"/>
        <Col sm="12" lg="12" xl="5" >
          <br></br>
          <br></br>
        <FormGroup tag="fieldset">
        <FormGroup check>
          <Input name="radio1" type="radio" />{" "}
          <Label check className="form-label">
          {data.quizOptions[0]}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input name="radio1" type="radio" />{" "}
          <Label check className="form-label">
          {data.quizOptions[1]}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input name="radio1" type="radio" />{" "}
          <Label check className="form-label">
          {data.quizOptions[2]}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input name="radio1" type="radio" />{" "}
          <Label check className="form-label">
          {data.quizOptions[3]}
          </Label>
        </FormGroup>
      <Button className="mt-2">Submit</Button>  
      </FormGroup>
      </Col>
      </Row>
      )}
    </div>
  );
}

export default Alerts;