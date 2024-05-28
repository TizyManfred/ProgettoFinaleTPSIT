const axios = require('axios');
const { getRandomNumber, getRandomMoves } = require('./utils');
const maxPokemonId = 1025;

async function getRandomPokemon() {
    try {
        const randomNumber = getRandomNumber(1, maxPokemonId); 
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
          moves: response.data.moves.map(move => move.move.name) 
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


  async function getPokemonDetails(pokemonName) {
    try {
      // Prova a ottenere i dettagli del Pokémon direttamente
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
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
      console.warn(`Direct fetch failed for ${pokemonName}, trying species endpoint`);
  
      try {
        // Se fallisce, prova a ottenere i dettagli della specie
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        const speciesData = speciesResponse.data;
  
        // Prende la prima varietà disponibile
        const firstVersionUrl = speciesData.varieties[0].pokemon.url;
        const firstVersionResponse = await axios.get(firstVersionUrl);
        const firstVersionData = firstVersionResponse.data;
  
        const imageShiny = firstVersionData.sprites.front_shiny;
        const imageUrl = firstVersionData.sprites.front_default;
        const name = firstVersionData.name;
        const id = firstVersionData.id;
        const type = firstVersionData.types[0].type.name;
  
        return {
          id: id,
          imageShiny: imageShiny,
          imageUrl: imageUrl,
          name: name,
          type: type
        };
      } catch (speciesError) {
        console.error(`Error fetching species details for ${pokemonName}:`, speciesError);
        return null;
      }
    }
  }
  

async function getRandomPokemons(count) {
    const randomPokemons = [];
    try {
      while (randomPokemons.length < count) {
        const randomPokemonId = getRandomNumber(1, maxPokemonId);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
        const pokemon = response.data;
        // Verifica se il nome del Pokémon è già presente nella lista
        if (!randomPokemons.some(p => p.name === pokemon.name)) {
          randomPokemons.push(pokemon);
        }
      }
      return randomPokemons;
    } catch (error) {
      console.error('Errore nel recuperare i Pokémon casuali:', error);
      throw error;
    }
  }
  


module.exports = {
  getRandomPokemon,
  getPokemonMovesFromAPI,
  getEvolutionData,
  getPokemonDetails,
  getRandomPokemons
};
