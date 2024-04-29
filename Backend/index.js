const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Configurazione del middleware di sessione
app.use(session({
  secret: 'segreto', // Chiave segreta per la firma delle sessioni
  resave: false, // Non salvare la sessione se non viene modificata
  saveUninitialized: false, // Non salvare la sessione per i nuovi utenti non autenticati
}));

// Configurazione del database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pokemon'
});

// Connessione al database
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connessione al database MySQL riuscita');
});

// Esempio di una route per ottenere dati dal database
app.get('/dati', (req, res) => {
  const query = 'SELECT * FROM tabella';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Errore nell\'esecuzione della query:', err);
      res.status(500).send('Errore nel recupero dei dati dal database');
      return;
    }
    res.json(results);
  });
});

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



app.get('/api/pokemon2', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=110&offset=220');
    const pokemonList = await Promise.all(response.data.results.map(async pokemon => {
      const pokemonData = await axios.get(pokemon.url);
      const evolutionChainResponse = await axios.get(pokemonData.data.species.url);
      const hasEvolutions = evolutionChainResponse.data.evolves_from_species ? true : false;
      if (!hasEvolutions) {
        return {
          name: pokemon.name,
          type: pokemonData.data.types[0].type.name,
          imageUrl: pokemonData.data.sprites.front_default
        };
      }
    }));
    const filteredList = pokemonList.filter(pokemon => pokemon !== undefined);
    res.json(filteredList);
  } catch (error) {
    console.error('Errore durante il recupero della lista dei Pokémon:', error);
    res.status(500).json({ error: 'Errore durante il recupero dei dati.' });
  }
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

// Funzione per mescollare un array (utilizzata per mescolare le opzioni di risposta)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Route per gestire la richiesta del quiz
app.get('/quiz', async (req, res) => {
  try {
    const pokemon = await getRandomPokemon();
    const { name, sprites, types } = pokemon;

    // Estrai il nome e l'URL dell'immagine del Pokemon
    const pokemonName = name;
    const pokemonImage = sprites.front_default;

    // Estrai il tipo corretto del Pokemon
    const correctType = types[0].type.name;

    // Estrai casualmente altri tipi di Pokemon diversi dal tipo corretto
    const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
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

app.post('/quiz/answer', (req, res) => {
  const { userAnswer, correctAnswer } = req.body;

  // Verifica se la risposta dell'utente è corretta confrontandola con la risposta corretta
  const isCorrect = userAnswer === correctAnswer;
  if(isCorrect){
    //Aumento il livello del pokemon
  }
  // Invia la risposta (corretta o errata) al frontend
  res.json({ isCorrect });
});

app.use(bodyParser.json());



// Route per la gestione delle richieste di login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Errore del server');
    } else if (result.length > 0) {
      // Creazione della sessione dopo il login con successo
      req.session.user = username;
      res.status(200).send('Accesso effettuato con successo');
    } else {
      res.status(401).send('Credenziali non valide');
    }
  });
});

function requireAuth(req, res, next) {
  if (req.session.user) {
    // L'utente è autenticato, procedi alla prossima route o middleware
    next();
  } else {
    // L'utente non è autenticato, reindirizzalo alla pagina di login o restituisci un errore
    res.status(401).send('Utente non autenticato');
  }
}

app.listen(5000, () => {
  console.log('Il server è in ascolto sulla porta 5000');
});

