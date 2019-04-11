function randomPair(n = 1, packsObj) {
  return new Promise((resolve, reject) => {
    if (isNaN(n) || n < 1 || n > 100) reject('Number of random cards needs to be between 1 and 100!');

    let result = [];
    for (let i = 0; i < n; i++) {
      const randomWhitePackIndex = Math.floor(Math.random() * Object.keys(packsObj).length);
      const randomWhitePackProperty = packsObj[Object.keys(packsObj)[randomWhitePackIndex]];

      const randomBlackPackIndex = Math.floor(Math.random() * Object.keys(packsObj).length);
      // For some reason, I can't seem to define this with a ternary operation.
      let randomBlackPackProperty = packsObj[Object.keys(packsObj)[randomBlackPackIndex]];
      if (randomBlackPackProperty.black.length == 0) randomBlackPackProperty = packsObj.official['main_deck'];
      
      const randomBlackIndex = Math.floor(Math.random() * randomBlackPackProperty.black.length);
      const randomWhiteIndex = Math.floor(Math.random() * randomWhitePackProperty.white.length);

      const blackCard = randomBlackPackProperty.black[randomBlackIndex];
      const whiteCard = randomWhitePackProperty.white[randomWhiteIndex];

      result.push({
        'index': i,
        'black': {
          'content': blackCard.content,
          'origin': {
            'name': randomBlackPackProperty.pack.name,
            'id': randomBlackPackProperty.pack.id
          },
          'pick': blackCard.pick,
          'draw' : blackCard.draw
        },
        'white': {
          'content': whiteCard,
          'origin': {
            'name': randomWhitePackProperty.pack.name,
            'id': randomWhitePackProperty.pack.id
          }
        }
      });
    }
    resolve(result);
  });
}

module.exports = {
  randomPair
}