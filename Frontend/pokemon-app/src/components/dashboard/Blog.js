import React, { useState, useEffect } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import axios from "axios";
axios.defaults.withCredentials = true; 

const Blog = (props) => {
  const [avviso, setAvviso] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [catturato, setCatturato] = useState(props.captured);
  const [catturaStr, setCatturaStr] = useState(props.captured ? "Catturato" : "Cattura");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('');

  useEffect(() => {
    setCatturato(props.captured);
    setCatturaStr(props.captured ? "Catturato" : "Cattura");
  }, [props.captured]);

  const inviaDati = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:50000/api/pokemon?pokemonId=${props.pokemonId}&userId=${props.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: 'include',
      });
  
      const responseData = await response.json();
      console.log(responseData); // Log della risposta dal backend
  
      if (!responseData.success) {
        if (responseData.error === "MAX_POKEMON_REACHED") {
          setModalMessage(responseData.message);
        } else {
          setModalMessage("Si è verificato un problema. Per favore, riprova più tardi.");
        }
        setModalColor("danger");
      } else {
        setModalMessage("Pokémon catturato con successo!");
        setModalColor("success");
        setCatturato(true);
        setCatturaStr("Catturato");
      }
      setModalOpen(true);
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
      setModalMessage("Si è verificato un errore durante l'invio dei dati. Per favore, riprova più tardi.");
      setModalColor("danger");
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    
    <Card>
      <CardImg alt="Card image cap" src={props.imageUrl} />
      <CardBody className="p-4">
        <CardTitle tag="h1">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</CardTitle>
        <CardSubtitle><i className="bi  bi-star-fill"></i> {props.type}</CardSubtitle><br></br>
        <Button color="primary" onClick={inviaDati} disabled={catturato}>{catturaStr}</Button>
        {isLoading && <p>Invio in corso...</p>}
        {avviso && (
          <Alert color={avviso.includes("successo") ? "success" : "danger"}>{avviso}</Alert>
        )}
      </CardBody>
          <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
      <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Messaggio</ModalHeader>
      <ModalBody>
        <Alert color={modalColor}>
          {modalMessage}
        </Alert>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModalOpen(!modalOpen)}>Chiudi</Button>
      </ModalFooter>
    </Modal>

    </Card>
    
  
  );
};

export default Blog;
