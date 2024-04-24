const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/pokemon', async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const pokemonList = await Promise.all(response.data.results.map(async pokemon => {
          const pokemonData = await axios.get(pokemon.url);
          if (!pokemonData.data.evolves_from_species) {
            return {
              name: pokemon.name,
              type: pokemonData.data.types[0].type.name,
              imageUrl: pokemonData.data.sprites.front_default
            };
          }
        }));
        // Rimuoviamo i valori nulli dall'array risultante
        const filteredList = pokemonList.filter(pokemon => pokemon !== undefined);
        res.json(pokemonList);
  } catch (error) {
    console.error('Errore durante il recupero della lista dei Pokémon:', error);
    res.status(500).json({ error: 'Errore durante il recupero dei dati.' });
  }
});



app.listen(5000, () => {
  console.log('Il server è in ascolto sulla porta 5000');
});
