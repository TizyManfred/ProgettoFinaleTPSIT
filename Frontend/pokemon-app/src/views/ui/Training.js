import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from 'axios';
import { redirect } from 'react-router-dom';
axios.defaults.withCredentials = true; 

const Training = () => {
  const [data, setData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:50000/api/allenamento')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // Reindirizza l'utente alla pagina di login
          window.location.href = '#/login?accesso=true';
        }else{
          console.error('Errore nella richiesta API:', error);
        }
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const userId = 1;

      axios.post(`http://localhost:50000/api/allenamento?userId=${userId}&answer=${selectedOption}&correctAnswer=${data.correctAnswer}`)
        .then(response => {
          const { success, message } = response.data;
          if (success) {
            setMessage(message);
          } else {
            console.error('Errore nella risposta del backend:', message);
          }
        })
        .catch(error => {
          console.error('Errore nell\'invio dei dati:', error);
        });
    } else {
      console.error('Seleziona una risposta prima di inviare.');
    }
  };

  const handleContinue = () => {
    window.location.reload(); // Ricarica la pagina
  };

  return (
    <div>
      {message ? (
        <div>
          <h1>{message}</h1>
          <Button onClick={handleContinue}>Continua</Button>
        </div>
      ) : (
        <div>
          <h1 className="mb-3">Quale è il tipo di {data.pokemonName} </h1>
          {data && Object.keys(data).length > 0 && ( // Check if data is not empty
            <Row>
              <img src={data.pokemonImage} alt="pro version" className="w-25"/>
              <Col sm="12" lg="12" xl="5" >
                <br></br>
                <br></br>
                <FormGroup tag="fieldset">
                  <FormGroup check>
                    <Input
                      type="radio"
                      name="quizOptions"
                      value={data.quizOptions[0]}
                      checked={selectedOption === data.quizOptions[0]}
                      onChange={handleOptionChange}
                    />{" "}
                    <Label check className="form-label">
                      {data.quizOptions[0]}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input
                      type="radio"
                      name="quizOptions"
                      value={data.quizOptions[1]}
                      checked={selectedOption === data.quizOptions[1]}
                      onChange={handleOptionChange}
                    />{" "}
                    <Label check className="form-label">
                      {data.quizOptions[1]}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input
                      type="radio"
                      name="quizOptions"
                      value={data.quizOptions[2]}
                      checked={selectedOption === data.quizOptions[2]}
                      onChange={handleOptionChange}
                    />{" "}
                    <Label check className="form-label">
                      {data.quizOptions[2]}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input
                      type="radio"
                      name="quizOptions"
                      value={data.quizOptions[3]}
                      checked={selectedOption === data.quizOptions[3]}
                      onChange={handleOptionChange}
                    />{" "}
                    <Label check className="form-label">
                      {data.quizOptions[3]}
                    </Label>
                  </FormGroup>
                  <Button className="mt-2" onClick={handleSubmit}>Invia</Button>  
                </FormGroup>
              </Col>
            </Row>
          )}
        </div>
      )}
    </div>
  );
}

export default Training;
