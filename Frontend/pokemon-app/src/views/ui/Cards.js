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

const BlogData = [
  {
    name: "squirtle",
    type: "water",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    btnbg: "primary",
  },
];

const Cards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:50000/api/pokemon')
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
    <h1 className="mb-3">Scegli Pokémon</h1>
    <Row>
      {data.map((blg, index) => (
        <Col sm="6" lg="6" xl="3" key={index}>
          <Blog
            name={blg.name}
            type={blg.type}
            imageUrl={blg.imageUrl}
          />
        </Col>
      ))}
    </Row>
  </div>
  );

// const Cards = () => {
//   return (
//     <div>
//       {/* --------------------------------------------------------------------------------*/}
//       {/* Card-1*/}
//       {/* --------------------------------------------------------------------------------*/}
//       <h5 className="mb-3">I Tuoi Pokemon</h5>
//       <Row>
//         {BlogData.map((blg, index) => (
//           <Col sm="6" lg="6" xl="3" key={index}>
//             <Blog
//               name={blg.name}
//               type={blg.type}
//               imageUrl={blg.imageUrl}
//             />
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
};

export default Cards;
