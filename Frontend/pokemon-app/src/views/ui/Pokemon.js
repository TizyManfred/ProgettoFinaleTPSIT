import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import Loader from "../../layouts/loader/Loader";
import Blog from "../../components/dashboard/Blog";
import axios from 'axios';
import './button.css';

axios.defaults.withCredentials = true;

const TOTAL_POKEMONS = 541;
const POKEMONS_PER_PAGE = 12;
const MAX_PAGES = Math.ceil(TOTAL_POKEMONS / POKEMONS_PER_PAGE);

const Pokemon = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState(page);

  const fetchData = (page) => {
    setLoading(true);
    axios.get(`http://localhost:50000/api/pokemon?page=${page}`)
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
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < MAX_PAGES) {
      setPage(prevPage => prevPage + 1);
      setInputPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
      setInputPage(page - 1);
    }
  };

  const handlePageInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 1 : Math.min(Math.max(value, 1), MAX_PAGES);
    setInputPage(value);
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      setPage(inputPage);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="mb-3">Cattura dei Pokémon</h1>
          <Row>
            {data.map((blg, index) => (
              <Col sm="6" lg="6" xl="3" key={index}>
                <Blog
                  pokemonId={blg.id}
                  name={blg.name}
                  type={blg.type}
                  imageUrl={blg.imageUrl}
                  captured={blg.captured}
                />
              </Col>
            ))}
          </Row>
          <div className="pagination">
            <Button className='padding' color="primary" onClick={handlePreviousPage} disabled={page === 1}>
            <i class="bi bi-arrow-left-circle"></i>
            </Button>
            <Input
              type="number"
              value={inputPage}
              onChange={handlePageInputChange}
              onKeyPress={handlePageInputKeyPress}
              style={{ width: '70px', display: 'inline-block', margin: '0 10px', fontSize: '16px' }}
            />
            <Button className='padding' color="primary" onClick={handleNextPage} disabled={page === MAX_PAGES}>
            <i class="bi bi-arrow-right-circle"></i>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
