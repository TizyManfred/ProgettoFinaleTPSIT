const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
const { getRandomPokemon, getPokemonMovesFromAPI, getEvolutionData, getPokemonDetails, getRandomPokemons } = require('./pokemonApi');
const { connection, getPokemonListFromDB } = require('./database');
const { getRandomNumber, shuffleArray } = require('./utils');
const userId=1;


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  next();
});


// Connessione al database
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connessione al database MySQL riuscita');
});


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


// Inserimento pokemon scelto dall'utente
app.post('/api/pokemon', async (req, res) => {
  const { pokemonId, userId } = req.query;

  try {
    // Verifica se sono presenti l'ID del Pokémon e dell'utente
    if (!pokemonId || !userId) {
      return res.status(400).json({ success: false, message: "ID del Pokémon o dell'utente mancanti" });
    }

    // Ottieni i dettagli del Pokémon dall'API
    const pokemonDetails = await getPokemonMovesFromAPI(pokemonId);

    // Inserisci il nuovo Pokémon nel database per l'utente specificato
    const insertQuery = `
      INSERT INTO pokemon (Id, Livello, Shiny, Mossa1, Mossa2, Mossa3, Mossa4, Username_Utente)
      VALUES (?, 1, 0, ?, ?, ?, ?, ?);
    `;
    connection.query(insertQuery, [pokemonId, pokemonDetails.randomMoves[0], pokemonDetails.randomMoves[1], pokemonDetails.randomMoves[2], pokemonDetails.randomMoves[3], userId], (error, results, fields) => {
      if (error) {
        console.error('Errore durante l\'inserimento del nuovo Pokémon nel database:', error);
        return res.status(500).json({ error: 'Errore durante l\'inserimento del nuovo Pokémon nel database.' });
      }
      console.log('Nuovo Pokémon aggiunto al database.');
      res.json({ success: true });
    });
  } catch (error) {
    console.error('Errore durante l\'aggiunta del nuovo Pokémon:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiunta del nuovo Pokémon.' });
  }
});


// Lista pokemon
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
      
      let pokemonDetails=await getPokemonDetails(pokemonName);
      
      const imageUrl = pokemon.Shiny===1 ? pokemonDetails.imageShiny : pokemonDetails.imageUrl;
      return {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: pokemonDetails.type,
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


// Allenamento, quiz per migliorare il livello dei pokemon
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


// Allenamento, quiz per migliorare i pokemon rendendoli shiny
app.get('/api/allenamentoSpeciale', async (req, res) => {
  try {
    const pokemons = await getRandomPokemons(4);
    
    console.log("ciao1")
    // Estrai il nome e l'URL dell'immagine del Pokemon
    const pokemonImage = pokemons[0].sprites.front_default;
    console.log("ciao2")
    // Estrai il tipo corretto del Pokemon
    const correctName = pokemons[0].name;

    // Aggiungi il tipo corretto e mescola le opzioni di risposta
    const randomNames = [pokemons[1].name,pokemons[2].name,pokemons[3].name];
    console.log("ciao3")
    const quizOptions = shuffleArray([...randomNames, correctName]);

    // Invia i dati del quiz all'utente, inclusa la risposta corretta
    res.json({
      pokemonImage,
      quizOptions,
      correctAnswer: correctName,
    });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recuperare il Pokemon casuale.', error });
  }
});


app.listen(50000, () => {
  console.log('Il server è in ascolto sulla porta 5000');
});