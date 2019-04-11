# cards-against-humanity-api
A simple Cards Against Humanity API built with Node.js.

## Dependencies

| Dependency:                                                              | Description:                                                     |
|--------------------------------------------------------------------------|------------------------------------------------------------------|
| [babel-cli](https://www.npmjs.com/package/babel-cli)                     | Babel command line.                                              |
| [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) | Babel preset for all es2015 plugins.                             |
| [express](https://www.npmjs.com/package/express)                         | Fast, unopinionated, minimalist web framework for node.          |
| [fs](https://www.npmjs.com/package/fs)                                   | File system utilities for Node.js.                               |
| [google-spreadsheets](https://www.npmjs.com/package/google-spreadsheets) | A simple node.js library to read data from a Google Spreadsheet. |

## Usage

Get a list of all the packs available with:

```
https://cah-gcs-api.herokuapp.com/api/v1/packs
```

Get a single pack (replace `$id` with the id of the pack you're trying to get) with:

```
https://cah-gcs-api.herokuapp.com/api/v1/pack/$id
```

Get a random pair of cards with:

```
https://cah-gcs-api.herokuapp.com/api/v1/random
```

Get a number of random pair of cards (up to 100) (replace `$number` with the number of pairs you want) with:

```
https://cah-gcs-api.herokuapp.com/api/v1/random?n=$number
```

or:

```
https://cah-gcs-api.herokuapp.com/api/v1/random/$number
```

## Deploy to Heroku

To deploy to Heroku, you can click on the image below and login to your account.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/greencoast-studios/cards-against-humanity-api)

## Author

This API was made by [moonstar-x](https://github.com/moonstar-x) of [Greencoast Studios](https://github.com/greencoast-studios).
