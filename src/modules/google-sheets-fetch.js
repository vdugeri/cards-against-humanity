const { Pack } = require('./classes/Pack.js');
const fs = require('fs');

// ID of the Google Sheets with all the data
const spreadsheetID = '1NeIMmSMT3nYv_YzucrToYouA4SMWTWr8G18lfCE61ZM';

// Handle run argument
const argumentList = {
  'official': 'official',
  'third_party': 'third_party',
  'custom': 'custom'
}
if (process.argv[2] == 'list') {
  console.log(`List of available pack types to fetch:\n${Object.keys(argumentList).join('\n')}`);
  console.log('Use: npm run fetch <pack type>');
  process.exit(0);
}
else if (!argumentList.hasOwnProperty(process.argv[2])) throw new Error(`Invalid argument! Use one of the following: ${Object.keys(argumentList).join(', ')}.`);

// Pack Directory Paths
const absolutePath = `./data/${process.argv[2]}/packs/`;
const relativePath = `../../data/${process.argv[2]}/packs/`;
const allPacksAbsolutePath = `./data/${process.argv[2]}/`;

// RANGES and PACKNAMES
const ranges = require(`./ranges/${process.argv[2]}/ranges.js`);
const RANGES = ranges.RANGES;
const PACKNAMES = ranges.PACKNAMES;

// Validate RANGES and PACKNAMES correspondance.
if (Object.keys(RANGES).length != Object.keys(PACKNAMES).length){
  throw new Error('RANGES and PACKNAMES do not correspond!');
}
for (const key in RANGES) {
  if (!PACKNAMES.hasOwnProperty(key)) {
    throw new Error('RANGES and PACKNAMES do not correspond!');
  }
}

// Validate RANGES object.
// Since every pack has at least white cards, we can afford to assume the white cards exist
// and do our checks when black cards exist.
for (const key in RANGES) {
  if (isNaN(RANGES[key][0])) throw new Error('Worksheet ID is not a number!');
  const whiteRange = RANGES[key][1].split(':');
  if (RANGES[key][2]) {
    const blackRange = RANGES[key][2].split(':');
    let blackCols = [];
    for (const axis of blackRange) {
      blackCols.push(axis.replace(/[0-9]/g, ''));
    }
    if (blackCols[0].length == blackCols[1].length && blackCols[0] >= blackCols[1]) throw new Error('Black range is not valid!');
  }
  if (whiteRange[0][0] != whiteRange[1][0]) throw new Error('White range is not valid!'); 
}

// Fetch all packs.
let callCooldown = 0;
let i = 0;
const totalPacks = Object.keys(PACKNAMES).length;

console.log(`Fetching ${process.argv[2]} expansion packs...`);
for (const key in PACKNAMES) {
  callCooldown+=200;
  setTimeout(() => {
    const pack = new Pack(spreadsheetID, key, PACKNAMES[key], process.argv[2], RANGES[key]);
    pack.fetchData().then( name => {
      i++;
      console.log(`[${Math.floor(100 * i / totalPacks)}%] - Fetched ${name}.`);
      if (i == totalPacks) listPacks();
    }).catch(err => console.error(err))
  }, callCooldown);
}

function listPacks() {
  // Create JSON with data from all expansion packs.
  let allPacks = {
    'packs': []
  }

  const packFiles = fs.readdirSync(absolutePath).filter(file => file.endsWith('.json'));
  for (const file of packFiles) {
    const pack = require(relativePath + file);
    allPacks.packs.push({
      'name': pack.pack.name,
      'id': pack.pack.id,
      'quantity': pack.quantity
    });
  }

  fs.writeFileSync(allPacksAbsolutePath + 'packs.json', JSON.stringify(allPacks, null, 2), function(err) {
    if (err) return console.log(err); 
  });

  console.log(`[DONE] - Created JSON with data from all expansion packs with ${allPacks.packs.length} entries.`);
}

