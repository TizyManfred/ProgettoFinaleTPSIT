// database.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestorepokemon'
});

connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connessione al database MySQL riuscita');
});

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

module.exports = {
  connection,
  getPokemonListFromDB
};