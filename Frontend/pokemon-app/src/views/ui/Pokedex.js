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
  import Blog2 from "../../components/dashboard/Blog2";
  import Loader from "../../layouts/loader/Loader";
  //import bg1 from "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
  import bg2 from "../../assets/images/bg/bg2.jpg";
  import bg3 from "../../assets/images/bg/bg3.jpg";
  import bg4 from "../../assets/images/bg/bg4.jpg";
  import axios from 'axios';
  import React, { useState, useEffect } from 'react';
  const BlogData = [
  ];
  

  const Pokedex = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Aggiungi lo stato per il caricamento
    
    useEffect(() => {
      axios.get('http://localhost:50000/api/pokedex')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Errore nella richiesta API:', error);
        })
        .finally(() => {
        setLoading(false);
    })
    }, []);
    console.log(data);
    return (
    <div>
      {loading ? (
        <Loader/>
      ) : (
        <div>
      <h1 className="mb-3">Pokédex</h1>
      <Row>
        {data.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog2
              name = {blg.name}
              type = {blg.type}
              imageUrl = {blg.imageUrl}
              level = {blg.level}
              ability1 = {blg.ability1}
              ability2 = {blg.ability2}
              ability3 = {blg.ability3}
              ability4 = {blg.ability4}
              shiny = {blg.shiny}
            />
          </Col>
        ))}
      </Row>
      </div>
      )}
    </div>
  )};
  export default Pokedex;
