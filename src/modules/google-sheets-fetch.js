const fs = require('fs');

// ID of the Google Sheets with all the data
const spreadsheetID = '1NeIMmSMT3nYv_YzucrToYouA4SMWTWr8G18lfCE61ZM';

// Run Every Packs Fetch Script
const packFiles = fs.readdirSync(__dirname + '/packs').filter(file => file.endsWith('.js'));

for (const file of packFiles) {
  const fetchScript = require('./packs/' + file);
  fetchScript.execute(spreadsheetID);
}