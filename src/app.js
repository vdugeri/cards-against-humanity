const express = require('express');
const fs = require('fs');
const http = require('http');
const random = require('./modules/api/random.js');

const app = express();
const HTTP_PORT = process.env.PORT || 4000;

const endpointPrefix = '/api/v1/';

// Heroku Keep Alive Function
function keepAlive() {
  setInterval( () => {
    const info = {
      host: 'cah-gcs-api.herokuapp.com',
      port: 80,
      path: '/'
    }
    http.get(info, _ => {
      console.log('Heroku keep alive...');
    }).on('error', console.error)
  }, 20 * 60 * 1000); // Runs every 20 minutes.
}

// Serve docs site
app.use('/', express.static('public'));

const types = require('../data/types.json');

let allPacksObj = {};
let packList = {};

// Load Packs with type
function loadPacks(packType) {
  allPacksObj[packType] = {};
  const packFiles = fs.readdirSync('./data/' + packType + '/packs/').filter(file => file.endsWith('.json'));
  for (const file of packFiles) {
    const pack = require('../data/' + packType + '/packs/' + file);
    allPacksObj[packType][pack.pack.id] = pack;
  }
}

// Load each pack and save its packs.json to packList
const dirs = fs.readdirSync('./data/').filter(dir => !dir.includes('.'));
for (const dir of dirs) {
  packList[dir] = require(`../data/${dir}/packs.json`);
  loadPacks(dir);
}

// Handle routes for every pack type
for (const type of Object.keys(packList)) {
  app.get(endpointPrefix + type, (req, res) => {
    if (!req.query.id) {
      console.log(`[REQUEST] ${req.ip} requested ${type} packs.`);
      res.status(200).send(packList[type]);
    } else if (allPacksObj[type].hasOwnProperty(req.query.id)){
      console.log(`[REQUEST] ${req.ip} requested ${req.query.id} from ${type} pack.`);
      res.status(200).send(allPacksObj[type][req.query.id])
    } else {
      res.status(404).send(`Pack does not exist. Please GET ${endpointPrefix}${type} to see a list of all the available ${type} packs.`);
    }
  });
}

app.get(endpointPrefix, (req, res) => {
  console.log(`[REQUEST] ${req.ip} requested expansion types.`);
  res.status(200).send(types);
});

app.get(endpointPrefix + 'types', (req, res) => {
  console.log(`[REQUEST] ${req.ip} requested expansion types.`);
  res.status(200).send(types);
});

app.get(endpointPrefix + 'packs', (req, res) => {
  console.log(`[REQUEST] ${req.ip} requested official packs.`);
  res.status(200).send(packList.official);
});

app.get(endpointPrefix + 'pack/:id', (req, res) => {
  if (allPacksObj.official.hasOwnProperty(req.params.id)) {
    console.log(`[REQUEST] ${req.ip} requested ${req.params.id} from official pack.`);
    res.status(200).send(allPacksObj.official[req.params.id]);
  } else {
    res.status(404).send(`Pack does not exist. Please GET ${endpointPrefix}packs to see a list of all the available official packs.`);
  }
});

app.get(endpointPrefix + 'random', (req, res) => {
  if (req.query.n) {
    random.randomPair(parseInt(req.query.n), allPacksObj.official).then(result => {
      console.log(`[REQUEST] ${req.ip} requested ${req.query.n} random pair(s).`);
      res.status(200).send(result);
    }).catch( err => res.status(400).send(err));
  } else {
    random.randomPair(1, allPacksObj.official).then(result => {
      console.log(`[REQUEST] ${req.ip} requested 1 random pair.`);
      res.status(200).send(result);
    }).catch( err => res.status(400).send(err));
  }
});

app.get(endpointPrefix + 'random/:n', (req, res) => {
  random.randomPair(parseInt(req.params.n), allPacksObj.official).then(result => {
    console.log(`[REQUEST] ${req.ip} requested ${req.params.n} random pair(s).`);
    res.status(200).send(result);
  }).catch( err => res.status(400).send(err));
});

app.listen(HTTP_PORT, () => {
  console.log(`[INFO] Server running on port ${HTTP_PORT}.`);
});

keepAlive();