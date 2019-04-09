const fs = require('fs');
const GoogleSpreadsheets = require('google-spreadsheets');

class Pack {
  constructor(spreadsheetID, packID, packName, range) {
    this.absolutePath = './src/data/packs/' + packID + '.json';
    this.relativePath = '../../data/packs/' + packID + '.json';

    this.pack = this._loadPackJSON();
    this.packName = packName;
    this.packID = packID;
    this._initializeObject();

    this.spreadsheetID = spreadsheetID;

    this.worksheet = range[0];
    this.whiteRange = range[1];
    this.blackRange = range[2];
  }

  fetchData() {
    const self = this;
    return new Promise(function(resolve, reject) {
      try {
        GoogleSpreadsheets({
          key: self.spreadsheetID,
          auth: null
        }, (err, spreadsheet) => {
          if (err) console.error(err);
          spreadsheet.worksheets[self.worksheet].cells({
            range: self.whiteRange
          }, (err, cells) => {
            if (err) console.error(err);
            for(const row in cells.cells) {
              for (const col in cells.cells[row]) {
                self.pack.white.push(cells.cells[row][col].value);
              }
            }
            
            // Since every pack has at least white cards, we can afford to omit the black ones in case they don't exist.
            if (self.blackRange) {
              spreadsheet.worksheets[self.worksheet].cells({
                range: self.blackRange
              }, (err, cells) => {
                if (err) console.error(err);
                for (const row in cells.cells) {
                  const obj = cells.cells[row];
                  const special = obj[Object.keys(obj)[1]] ? obj[Object.keys(obj)[1]].value.split(' ') : [];
                  
                  const pickIndex = special.indexOf('PICK');
                  const drawIndex = special.indexOf('DRAW');
                  const pick = pickIndex > -1 ? parseInt(special[pickIndex + 1]) : 1;
                  const draw = drawIndex > -1 ? parseInt(special[drawIndex + 1]) : 1;
        
                  self.pack.black.push({
                    'content': obj[Object.keys(obj)[0]].value,
                    'pick': pick,
                    'draw' : draw
                  });
                }
      
                self._setQuantity();
                self._writeData();
                resolve(self.packName);
              });
            } else {
              self._setQuantity();
              self._writeData();
              resolve(self.packName);
            }
          });
        });
      } catch(err) {
        reject(err)
      }
    })
  }

  _loadPackJSON() {
    if (fs.existsSync(this.absolutePath)) {
      return require(this.relativePath);
    } else {
      fs.writeFileSync(this.absolutePath, JSON.stringify({}, null, 2), function(err) {
        if (err) return console.error(err);
      });
      return require(this.relativePath);
    }
  }

  _setQuantity() {
    this.pack.quantity.black = this.pack.black.length
    this.pack.quantity.white = this.pack.white.length
    this.pack.quantity.total = this.pack.quantity.black + this.pack.quantity.white
  }

  _initializeObject() {
    this.pack.pack = {
      'name': this.packName,
      'id': this.packID
    }
    this.pack.black = []
    this.pack.white = []
    this.pack.quantity = {
      'black': 0,
      'white': 0,
      'total': 0
    }
  }

  _writeData() {
    fs.writeFileSync(this.absolutePath, JSON.stringify(this.pack, null, 2), function(err) {
      if (err) return console.log(err); 
    });
  }
}

module.exports = {
  Pack: Pack
}