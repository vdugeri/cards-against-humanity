module.exports = {
  name: 'main_deck',
  execute(spreadsheetID) {
    const GoogleSpreadsheets = require('google-spreadsheets');
    const fs = require('fs');

    const filename = 'main_deck.json';
    const absolutePath = './src/data/packs/' + filename;
    const relativePath = '../../data/packs/' + filename;
    
    const mainDeck = loadPackJSON();

    function loadPackJSON() {
      if (fs.existsSync(absolutePath)) {
        return require(relativePath);
      } else {
        fs.writeFileSync(absolutePath, JSON.stringify({}, null, 2), function(err) {
          if (err) return console.error(err);
        });
        return require(relativePath);
      }
    }

    // Google Sheets Range
    const MAIN_WHITES = [4, 'B293:B1547'];
    const MAIN_BLACKS = [4, 'B6:C287']

    // Initialize Object
    mainDeck.pack = {
      'name': 'Main Deck',
      'id': 'main_deck'
    }
    mainDeck.black = []
    mainDeck.white = []
    mainDeck.quantity = {
      'black': 0,
      'white': 0,
      'total': 0
    }

    // Google Sheets Anonymous Query
    GoogleSpreadsheets({
      key: spreadsheetID,
      auth: null
    }, function(err, spreadsheet) {
        if (err) console.log(err)
        spreadsheet.worksheets[MAIN_WHITES[0]].cells({
          range: MAIN_WHITES[1]
        }, function(err, cells) {
          if (err) console.log(err)
          for(row in cells.cells) {
            for(col in cells.cells[row]) {
              mainDeck.white.push(cells.cells[row][col].value)
            }
          }
          
          mainDeck.quantity.black = mainDeck.black.length
          mainDeck.quantity.white = mainDeck.white.length
          mainDeck.quantity.total = mainDeck.quantity.black + mainDeck.quantity.white
    
          fs.writeFileSync(absolutePath, JSON.stringify(mainDeck, null, 2), function(err) {
            if (err) return console.log(err); 
          });
    
        });
        spreadsheet.worksheets[MAIN_BLACKS[0]].cells({
          range: MAIN_BLACKS[1]
        }, function(err, cells) {
          for(row in cells.cells) {
            const obj = cells.cells[row]
            const special = obj[Object.keys(obj)[1]] ? obj[Object.keys(obj)[1]].value.split(' ') : []
    
            const pickIndex = special.indexOf('PICK')
            const drawIndex = special.indexOf('DRAW')
            const pick = pickIndex > -1 ? parseInt(special[pickIndex + 1]) : 1
            const draw = drawIndex > -1 ? parseInt(special[drawIndex + 1]) : 1
    
            mainDeck.black.push({
              'content': obj[Object.keys(obj)[0]].value,
              'pick': pick,
              'draw' : draw
            }) 
          }
        });
    });
  }
}