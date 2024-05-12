// utils.js
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array;  
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
module.exports = {
    getRandomNumber,
    shuffleArray,
    getRandomMoves
 };
