//Pagina di Tiziano
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
} from "reactstrap";

import Blog from "../../components/dashboard/Blog";
//import bg1 from "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Aggiungi lo stato per il caricamento

  useEffect(() => {
    axios.get('http://localhost:50000/api/pokemon')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Errore nella richiesta API:', error);
      })
      .finally(() => {
        setLoading(false); // Imposta lo stato di caricamento su false una volta completata la richiesta
      });
  }, []);

  console.log(data);

  return (
    <div>
      {/* Visualizza un messaggio di caricamento finché la richiesta è in corso */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className="mb-3">Scegli Pokémon</h1>
          <Row>
            {data.map((blg, index) => (
              <Col sm="6" lg="6" xl="3" key={index}>
                <Blog
                  userId="1"
                  pokemonId={blg.id}
                  name={blg.name}
                  type={blg.type}
                  imageUrl={blg.imageUrl}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Cards;
