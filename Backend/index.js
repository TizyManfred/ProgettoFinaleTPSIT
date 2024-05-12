const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  next();
});


// Funzione per ottenere casualmente un numero compreso tra min e max
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Funzione per ottenere un Pokemon casuale dall'API
const getRandomPokemon = async () => {
  try {
    const randomNumber = getRandomNumber(1, 898); // Ci sono 898 Pokemon disponibili nell'API
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
    const pokemon = response.data;
    return pokemon;
  } catch (error) {
    console.error('Errore nel recuperare il Pokemon casuale:', error);
    throw error;
  }
};

// Funzione per mescolare un array (utilizzata per mescolare le opzioni di risposta)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Funzione per prendere tutte le mosse di un determinato pokemon
async function getPokemonDetailsFromAPI(pokemonId) {
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

// Funzione per selezionare casualmente 4 mosse tra quelle disponibili
function getRandomMoves(moves) {
  const randomMoves = [];
  const shuffledMoves = moves.sort(() => Math.random() - 0.5); // Mischia l'array di mosse
  for (let i = 0; i < 4; i++) {
    randomMoves.push(shuffledMoves[i]);
  }
  return randomMoves;
}

// Configurazione del database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestorepokemon'
});

// Connessione al database
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connessione al database MySQL riuscita');
});

// Funzione per ottenere la lista di Pokémon dal database per un dato utente
function getPokemonListFromDB(userId) {
  const query = `
    SELECT Id
    FROM pokemon
    WHERE Username_Utente = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(query, [userId], (error, results, fields) => {
      if (error) {
        console.error('Errore durante il recupero della lista dei Pokémon dal database:', error);
        reject(error);
        return;
      }
      const pokemonIds = results.map(row => row.Id);
      resolve(pokemonIds);
    });
  });
}

const userId=1;

// Lista di pokemon base tra i primi 110+pichu
app.get('/api/pokemon', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=110');
    const pokemonList = await Promise.all(response.data.results.map(async pokemon => {
      const pokemonData = await axios.get(pokemon.url);
      const evolutionChainResponse = await axios.get(pokemonData.data.species.url);
      const hasEvolutions = evolutionChainResponse.data.evolves_from_species ? true : false;
      if (!hasEvolutions) {
        return {
          id: pokemonData.data.id,
          name: pokemon.name,
          type: pokemonData.data.types[0].type.name,
          imageUrl: pokemonData.data.sprites.front_default
        };
      }
    }));

    // Aggiungi Pichu manualmente alla lista
    const pichu = {
      id: 172, // ID di Pichu sulla PokeAPI
      name: 'pichu',
      type: 'electric',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png'
    };
    pokemonList.push(pichu);
    
    // Ottieni la lista di Pokémon dal database
    
    var pokemonListFromDB = ""; // Implementa questa funzione per ottenere la lista di Pokémon dal database
    
    try {
      pokemonListFromDB = await getPokemonListFromDB(userId);
    } catch (error) {
      console.error('Errore:', error);
    }
    // Filtra i Pokémon ottenuti dall'API per escludere quelli già presenti nel database
    const filteredPokemonList = pokemonList.filter(apiPokemon => {
      if(apiPokemon!==undefined)
        return !pokemonListFromDB.includes(apiPokemon.id);
    });
    // Invia la lista filtrata di Pokémon al client
    res.json(filteredPokemonList);
  } catch (error) {
    console.error('Errore durante il recupero della lista dei Pokémon:', error);
    res.status(500).json({ error: 'Errore durante il recupero dei dati.' });
  }
});

//Inserimento pokemon scelto dall'utente
app.post('/api/pokemon', async (req, res) => {
  const { pokemonId, userId } = req.body;

  try {
    // Ottieni i dettagli del Pokémon dall'API
    const pokemonDetails = await getPokemonDetailsFromAPI(pokemonId);

    // Inserisci il nuovo Pokémon nel database per l'utente specificato
    const insertQuery = `
      INSERT INTO pokemon (Id, Livello, Shiny, Mossa1, Mossa2, Mossa3, Mossa4, Username_Utente)
      VALUES (?, 1, 0, ?, ?, ?, ?, ?);
    `;
    connection.query(insertQuery, [pokemonId, pokemonDetails.randomMoves[0], pokemonDetails.randomMoves[1], pokemonDetails.randomMoves[2], pokemonDetails.randomMoves[3], userId], (error, results, fields) => {
      if (error) {
        console.error('Errore durante l\'inserimento del nuovo Pokémon nel database:', error);
        res.status(500).json({ error: 'Errore durante l\'inserimento del nuovo Pokémon nel database.' });
        return;
      }
      console.log('Nuovo Pokémon aggiunto al database.');
      res.json({ success: true });
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiunta del nuovo Pokémon.' });
  }
});

// Allenamento, quiz per migliorare il pokemon
app.get('/api/allenamento', async (req, res) => {
  try {
    const pokemon = await getRandomPokemon();
    const { name, sprites, types } = pokemon;

    // Estrai il nome e l'URL dell'immagine del Pokemon
    const pokemonName = name;
    const pokemonImage = sprites.front_default;

    // Estrai il tipo corretto del Pokemon
    const correctType = types[0].type.name;

    // Estrai casualmente altri tipi di Pokemon diversi dal tipo corretto
    const otherTypes = allTypes.filter(type => type !== correctType);
    const randomTypes = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = getRandomNumber(0, otherTypes.length - 1);
      randomTypes.push(otherTypes[randomIndex]);
      otherTypes.splice(randomIndex, 1);
    }

    // Aggiungi il tipo corretto e mescola le opzioni di risposta
    const quizOptions = shuffleArray([...randomTypes, correctType]);

    // Invia i dati del quiz all'utente, inclusa la risposta corretta
    res.json({
      pokemonName,
      pokemonImage,
      quizOptions,
      correctAnswer: correctType,
    });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recuperare il Pokemon casuale.' });
  }
});





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


// Definizione della route
app.get('/api/pokedex', async (req, res) => {
  const query = `SELECT * FROM pokemon WHERE Username_Utente = ?`;
  
  connection.query(query, [userId], async (error, results) => {
    if (error) {
      console.error('Errore durante l\'esecuzione della query:', error);
      res.status(500).json({ error: 'Errore durante l\'esecuzione della query' });
      return;
    }
    const pokemonData = await Promise.all(results.map(async pokemon => {
      evolution=await getEvolutionData(pokemon.Id);
      pokemonName=evolution.firstEvolution;
      if(pokemon.Livello>=16 && evolution.secondEvolution!==null){
        pokemonName=evolution.secondEvolution;
      }
      if(pokemon.Livello>=32 && evolution.thirdEvolution!==null){
        pokemonName=evolution.thirdEvolution;
      }
      console.log(pokemonName)
      let pokemonDetails=await getPokemonDetails(pokemonName);
      console.log(pokemonDetails)
      console.log(pokemonDetails.id)
      const imageUrl = pokemon.Shiny===1 ? pokemonDetails.imageShiny : pokemonDetails.imageUrl;
      return {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        level: pokemon.Livello,
        imageUrl: imageUrl,
        ability1: pokemon.Mossa1,
        ability2:pokemon.Mossa2, 
        ability3:pokemon.Mossa3, 
        ability4:pokemon.Mossa4
      };

    }));
    // Invia i risultati della query come risposta JSON
    res.json(pokemonData);
  });
});




// Chiusura della connessione al database quando non è più necessario
// connection.end();



app.listen(5000, () => {
  console.log('Il server è in ascolto sulla porta 5000');
});