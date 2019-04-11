const express = require('express');
const fs = require('fs');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 4000;

const endpointPrefix = '/api/v1/';

// Load Packs
const packs = require('../data/packs.json');
let packsObj = {};
// Load Each Pack
const packFiles = fs.readdirSync('./data/packs').filter(file => file.endsWith('.json'));
for (const file of packFiles) {
  const pack = require('../data/packs/' + file);
  packsObj[pack.pack.id] = pack;
}

// Get Random Card Pair
function randomPair(n = 1) {
  return new Promise((resolve, reject) => {
    if (isNaN(n) || n < 1 || n > 100) reject('Number of random cards needs to be between 1 and 100!');

    let result = [];
    for (let i = 0; i < n; i++) {
      const randomWhitePackIndex = Math.floor(Math.random() * Object.keys(packsObj).length);
      const randomWhitePackProperty = packsObj[Object.keys(packsObj)[randomWhitePackIndex]];

      const randomBlackPackIndex = Math.floor(Math.random() * Object.keys(packsObj).length);
      // For some reason, I can't seem to define this with a ternary operation.
      let randomBlackPackProperty = packsObj[Object.keys(packsObj)[randomBlackPackIndex]];
      if (randomBlackPackProperty.black.length == 0) randomBlackPackProperty = packsObj['main_deck'];
      
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

app.get(endpointPrefix + 'packs', (req, res) => {
  console.log(`[REQUEST] ${req.ip} requested packs.`);
  res.status(200).send(packs);
});

app.get(endpointPrefix + 'pack/:id', (req, res) => {
  if (packsObj.hasOwnProperty(req.params.id)) {
    console.log(`[REQUEST] ${req.ip} requested ${req.params.id} pack.`);
    res.status(200).send(packsObj[req.params.id]);
  } else {
    res.status(404).send(`Pack does not exist. Please GET ${endpointPrefix}packs to see a list of all the available packs.`);
  }
});

app.get(endpointPrefix + 'random', (req, res) => {
  if (req.query.n) {
    randomPair(parseInt(req.query.n)).then(result => {
      console.log(`[REQUEST] ${req.ip} requested ${req.query.n} random pair(s).`);
      res.status(200).send(result);
    }).catch( err => res.status(400).send(err));
  } else {
    randomPair().then(result => {
      console.log(`[REQUEST] ${req.ip} requested 1 random pair.`);
      res.status(200).send(result);
    }).catch( err => res.status(400).send(err));
  }
});

app.get(endpointPrefix + 'random/:n', (req, res) => {
  randomPair(parseInt(req.params.n)).then(result => {
    console.log(`[REQUEST] ${req.ip} requested ${req.params.n} random pair(s).`);
    res.status(200).send(result);
  }).catch( err => res.status(400).send(err));
});

app.listen(HTTP_PORT, () => {
  console.log(`[INFO] Server running on port ${HTTP_PORT}.`);
});