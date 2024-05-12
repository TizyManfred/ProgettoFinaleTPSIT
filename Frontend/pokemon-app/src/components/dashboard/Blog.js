import React, { useState } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  const [avviso, setAvviso] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const inviaDati = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:50000/api/pokemon?pokemonId=${props.pokemonId}&userId=${props.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const responseData = await response.json();
      console.log(responseData); // Log della risposta dal backend
  
      if (!responseData.success) {
        setAvviso("Si è verificato un problema. Per favore, riprova più tardi.");
      } else {
        setAvviso("Richiesta completata con successo!");
      }
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
      if (error instanceof TypeError) {
        setAvviso("Impossibile connettersi al server. Controlla la tua connessione internet.");
      } else {
        setAvviso("Si è verificato un errore durante l'invio dei dati. Per favore, riprova più tardi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardImg alt="Card image cap" src={props.imageUrl} />
      <CardBody className="p-4">
        <CardTitle tag="h1">{props.name}</CardTitle>
        <CardSubtitle>Type: {props.type}</CardSubtitle><br></br>
        <Button color="primary" onClick={inviaDati} disabled={isLoading}>Cattura</Button>
        {isLoading && <p>Invio in corso...</p>}
        {avviso && (
          <Alert color={avviso.includes("successo") ? "success" : "danger"}>{avviso}</Alert>
        )}
      </CardBody>
    </Card>
  );
};

export default Blog;
