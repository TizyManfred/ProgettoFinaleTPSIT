// database.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestorepokemon'
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