import React, { useState, useEffect } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Button,
} from "reactstrap";
import axios from "axios";
axios.defaults.withCredentials = true; 

const Blog = (props) => {
  const [avviso, setAvviso] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [catturato, setCatturato] = useState(props.captured);
  const [catturaStr, setCatturaStr] = useState(props.captured ? "Catturato" : "Cattura");

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
        setAvviso("Si è verificato un problema. Per favore, riprova più tardi.");
      } else {
        setAvviso("Richiesta completata con successo!");
        setCatturato(true);
        setCatturaStr("Catturato");
      }
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
      if (error instanceof TypeError) {
        setAvviso("Impossibile connettersi al server. Controlla la tua connessione internet.");
      } else {
        setAvviso("Si è verificato un errore durante l'invio dei dati. Per favore, riprova più tardi.");
      }
      setCatturato(false);
      setCatturaStr("Cattura");
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
    </Card>
  );
};

export default Blog;
