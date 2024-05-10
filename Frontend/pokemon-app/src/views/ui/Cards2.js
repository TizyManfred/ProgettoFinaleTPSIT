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
  
 

  const BlogData = [
    {
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png",
      name: "bulbasaur",
      subtitle: "grass",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      btnbg: "primary",
    },
    {
      name: "koffing",
      type: "poison",
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png",
      level: "5",
      ability1: "cacca",
      ability2: "pupù",
      ability3: "pipì",
      ability4: "chini"
    }
  
    // {
    //   image: bg2,
    //   title: "Lets be simple blog",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
    // {
    //   image: bg3,
    //   title: "Don't Lamp blog",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
    // {
    //   image: bg4,
    //   title: "Simple is beautiful",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
  ];
  

  const Cards = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:5000/api/pokemon')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Errore nella richiesta API:', error);
        });
    }, []);
    console.log(data);
    return (<div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <h1 className="mb-3">I tuoi Pokémon</h1>
      <Row>
        {data.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              name = {blg.name}
              type = {blg.type}
              imageUrl = {blg.imageUrl}
              level = {blg.level}
              ability1 = {blg.ability1}
              ability2 = {blg.ability2}
              ability3 = {blg.ability3}
              ability4 = {blg.ability4}

              


            />
          </Col>
        ))}
      </Row>
    </div>
    );
  };
  export default Cards;
  