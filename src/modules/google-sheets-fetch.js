const { Pack } = require('./classes/Pack.js');

// ID of the Google Sheets with all the data
const spreadsheetID = '1NeIMmSMT3nYv_YzucrToYouA4SMWTWr8G18lfCE61ZM';

// Google Sheets Ranges
// Object(Key: Pack ID, Value: [WORKSHEET_INDEX, WHITE, BLACK])
const RANGES = {
  'main_deck': [4, 'B293:B1547', 'B6:C287'],
  'canadian_conversion_kit': [4, 'B1571:B1592', 'B1563:C1569'],
  'uk_conversion_kit': [4, 'B1619:B1692', 'B1598:C1617']
}

// Pack Names
// Object(Key: Pack ID, Value: Pack Name)
const PACKNAMES = {
  'main_deck': 'Main Deck',
  'canadian_conversion_kit': 'Canadian Conversion Kit',
  'uk_conversion_kit': 'UK Conversion Kit',
}

// Validate RANGES and PACKNAMES objects.
if (Object.keys(RANGES).length != Object.keys(PACKNAMES).length){
  throw new Error('RANGES and PACKNAMES do not correspond.');
}
for (const key in RANGES) {
  if (!PACKNAMES.hasOwnProperty(key)) {
    throw new Error('RANGES and PACKNAMES do not correspond.');
  }
}

// Fetch all packs
for (const key in PACKNAMES) {
  const pack = new Pack(spreadsheetID, key, PACKNAMES[key], RANGES[key]);
  pack.fetchData();
}