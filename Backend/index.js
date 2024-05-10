const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
app.use(bodyParser.json());
// Funzione per ottenere casualmente un numero compreso tra min e max
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Consenti l'accesso da tutti i domini
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Metodi consentiti
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Intestazioni consentite
  next();
});

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

const userId="1";

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






// Chiusura della connessione al database quando non è più necessario
// connection.end();



app.listen(5000, () => {
  console.log('Il server è in ascolto sulla porta 5000');
});