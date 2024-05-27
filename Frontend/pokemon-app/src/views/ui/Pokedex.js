import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Blog2 from "../../components/dashboard/Blog2";
import Loader from "../../layouts/loader/Loader";
import axios from 'axios';

axios.defaults.withCredentials = true;

const Pokedex = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:50000/api/pokedex')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          window.location.href = '#/login?accesso=true';
        } else {
          console.error('Errore nella richiesta API:', error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const confirmReleasePokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    toggleModal();
  };

  const handleReleasePokemon = () => {
    axios.delete(`http://localhost:50000/api/pokemon`, { params: { pokemonId: selectedPokemon.id } })
      .then(response => {
        if (response.data.success) {
          setData(data.filter(pokemon => pokemon.id !== selectedPokemon.id));
          toggleModal();
        }
      })
      .catch(error => {
        console.error('Errore nel rilascio del Pokémon:', error);
      });
  };

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
                  name={blg.name}
                  type={blg.type}
                  imageUrl={blg.imageUrl}
                  level={blg.level}
                  ability1={blg.ability1}
                  ability2={blg.ability2}
                  ability3={blg.ability3}
                  ability4={blg.ability4}
                  shiny={blg.shiny}
                  onRelease={() => confirmReleasePokemon(blg)}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {selectedPokemon && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Conferma Rilascio</ModalHeader>
          <ModalBody>
            Sei sicuro di voler rilasciare {selectedPokemon.name}?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleReleasePokemon}>Rilascia</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Annulla</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default Pokedex;
