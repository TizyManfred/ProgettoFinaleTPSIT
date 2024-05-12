const axios = require('axios');
const { getRandomNumber, getRandomMoves } = require('./utils');

async function getRandomPokemon() {
    try {
        const randomNumber = getRandomNumber(1, 898); // Ci sono 898 Pokemon disponibili nell'API
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
        const pokemon = response.data;
        return pokemon;
    } catch (error) {
        console.error('Errore nel recuperare il Pokemon casuale:', error);
        throw error;
    }
}

async function getPokemonMovesFromAPI(pokemonId) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonMoves = {
          moves: response.data.moves.map(move => move.move.name) // Ottieni i nomi delle mosse del Pokémon
        };
    
        // Seleziona casualmente 4 mosse tra quelle disponibili
        pokemonMoves.randomMoves = getRandomMoves(pokemonMoves.moves);
    
        return pokemonMoves;
      } catch (error) {
        console.error('Errore durante il recupero dei dettagli del Pokémon dall\'API:', error);
        throw error;
      }
}

// Funzione per ottenere i dati dell'evoluzione
async function getEvolutionData(basePokemonId) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${basePokemonId}`);
        const pokemonData = response.data;
  
        let firstEvolutionData = null;
        let secondEvolutionData = null;
        let thirdEvolutionData = null;
  
        // Cerca le evoluzioni nel campo "evolution_chain" del pokemon
    
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${basePokemonId}`);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
  
        const evolutionChainResponse = await axios.get(evolutionChainUrl);
        const evolutionChainData = evolutionChainResponse.data.chain;
  
        // Verifica se c'è una seconda evoluzione
        if (evolutionChainData && evolutionChainData.evolves_to && evolutionChainData.evolves_to.length > 0) {
            secondEvolutionData = evolutionChainData.evolves_to[0].species.name;
  
            // Verifica se c'è una terza evoluzione
            if (evolutionChainData.evolves_to[0].evolves_to && evolutionChainData.evolves_to[0].evolves_to.length > 0) {
                thirdEvolutionData = evolutionChainData.evolves_to[0].evolves_to[0].species.name;
            }
        }
  
        // Se c'è solo una prima evoluzione, controlla se ci sono ulteriori evoluzioni dopo
        if (evolutionChainData && evolutionChainData.species) {
            firstEvolutionData = evolutionChainData.species.name;
            if (evolutionChainData.evolves_to && evolutionChainData.evolves_to.length > 0) {
                // Se esiste una seconda evoluzione, impostiamo i dati di essa
                secondEvolutionData = evolutionChainData.evolves_to[0].species.name;
  
                // Verifica se c'è una terza evoluzione
                if (evolutionChainData.evolves_to[0].evolves_to && evolutionChainData.evolves_to[0].evolves_to.length > 0) {
                    thirdEvolutionData = evolutionChainData.evolves_to[0].evolves_to[0].species.name;
                }
            }
        }
        
  
        return {
            firstEvolution: firstEvolutionData,
            secondEvolution: secondEvolutionData,
            thirdEvolution: thirdEvolutionData
        };
    } catch (error) {
        console.error("Error fetching evolution data:", error);
        return null;
    }
  }

async function getPokemonDetails(pokemonId) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonData = response.data;
  
        const imageShiny = pokemonData.sprites.front_shiny;
        const imageUrl = pokemonData.sprites.front_default;
  
        const name = pokemonData.name;
        const id = pokemonData.id;
  
        const type = pokemonData.types[0].type.name;
        
        return {
            id: id,
            imageShiny: imageShiny,
            imageUrl: imageUrl,
            name: name,
            type: type
        };
    } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        return null;
    }
  }

module.exports = {
  getRandomPokemon,
  getPokemonMovesFromAPI,
  getEvolutionData,
  getPokemonDetails
};
