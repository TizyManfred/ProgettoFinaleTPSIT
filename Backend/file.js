

// Configurazione del middleware di sessione
app.use(session({
    secret: 'segreto', // Chiave segreta per la firma delle sessioni
    resave: false, // Non salvare la sessione se non viene modificata
    saveUninitialized: false, // Non salvare la sessione per i nuovi utenti non autenticati
  }));
  
  
  
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
  
  /*
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
  */
  
  
  
  
  
  
  
  
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