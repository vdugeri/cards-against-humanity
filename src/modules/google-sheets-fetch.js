const { Pack } = require('./classes/Pack.js');

// ID of the Google Sheets with all the data
const spreadsheetID = '1NeIMmSMT3nYv_YzucrToYouA4SMWTWr8G18lfCE61ZM';

// Google Sheets Ranges
// Object(Key: Pack ID, Value: [WORKSHEET_INDEX, WHITE, BLACK])
const RANGES = {
  'main_deck': [4, 'B293:B1547', 'B6:C287'],
  'canadian_conversion_kit': [4, 'B1571:B1592', 'B1563:C1569'],
  'uk_conversion_kit': [4, 'B1619:B1692', 'B1598:C1617'],
  'first_expansion': [5, 'B33:B144', 'B4:C31'],
  'second_expansion': [5, 'B181:B264', 'B152:C179'],
  'third_expansion': [5, 'B298:B374', 'B272:C296'],
  'fourth_expansion': [5, 'B414:B484', 'B382:C412'],
  'fifth_expansion': [5, 'B518:B595', 'B492:C516'],
  'sixth_expansion': [5, 'B630:B706', 'B603:C628'],
  'red_box_expansion': [5, 'M78:M344', 'M4:N76'],
  'blue_box_expansion': [5, 'M433:M666', 'M350:N430'],
  'green_box_expansion': [5, 'M729:M974', 'M672:N727'],
  'absurd_box_expansion': [5, 'M1026:M1280', 'M980:N1024'],
  'bigger_black_box_expansion': [5, 'T7:T30', null],
  'procedurally_expansion': [5, 'T36:T295', null],
  'card_lab_expansion': [5, 'AA78:AA1040', 'AA4:AB76'],
}

// Pack Names
// Object(Key: Pack ID, Value: Pack Name)
const PACKNAMES = {
  'main_deck': 'Main Deck',
  'canadian_conversion_kit': 'Canadian Conversion Kit',
  'uk_conversion_kit': 'UK Conversion Kit',
  'first_expansion': 'First Expanion',
  'second_expansion': 'Second Expansion',
  'third_expansion': 'Third Expansion',
  'fourth_expansion': 'Fourth Expansion',
  'fifth_expansion': 'Fifth Expansion',
  'sixth_expansion': 'Sixth Expansion',
  'red_box_expansion': 'Red Box Expansion',
  'blue_box_expansion': 'Blue Box Expansion',
  'green_box_expansion': 'Green Box Expansion',
  'absurd_box_expansion': 'Absurd Box Expansion',
  'bigger_black_box_expansion': 'Bigger Black Box Expansion',
  'procedurally_expansion': 'Procedurally Generated Expansion',
  'card_lab_expansion': 'Card Lab Expansion',
}

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
    if (blackCols[0] >= blackCols[1]) throw new Error('Black range is not valid!');
  }
  if (whiteRange[0][0] != whiteRange[1][0]) throw new Error('White range is not valid!'); 
}

// Fetch all packs.
let i = 0;
const totalPacks = Object.keys(PACKNAMES).length;
for (const key in PACKNAMES) {
  const pack = new Pack(spreadsheetID, key, PACKNAMES[key], RANGES[key]);
  pack.fetchData().then( name => {
    i++;
    console.log(`[${Math.floor(100 * i / totalPacks)}%] - Fetched ${name}.`);
  }).catch(err => console.error(err))
}