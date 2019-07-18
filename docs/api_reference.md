# API Reference

Currently our API is limited to `GET` requests, in the future we plan on adding a `POST` request feature to add your own custom card packs.

## GET Requests

### List All The Expansion Types

You can request a list of the types of expansions along with the id's of their packs.

```
https://cah-gcs-api.herokuapp.com/api/v1/
```

or with:

```
https://cah-gcs-api.herokuapp.com/api/v1/types
```

This returns a **JSON** with the following structures:

``` json
{
  "types": [
    {
      "id": "official",
      "name": "Official",
      "packs": [
        "2012_holiday_pack",
        "2013_holiday_pack",
        ...
      ],
      "quantity": 70
    },
    ...
  ]
}
```

### List All The Official Packs

You can request a list of all the official packs available with:

```
https://cah-gcs-api.herokuapp.com/api/v1/packs
```

This returns a **JSON** with the following structure:

``` json
{
  "packs": [
    {
      "name": "Expansion Pack Name",
      "id": "expansion_pack_id",
      "quantity": {
        "black": 10,
        "white": 15,
        "total": 25
      }
    },
    ...
  ]
}
```

The `packs.id` property is derived from the expansion name with URL friendly characters.

### Single Official Pack

You can request a single official pack with:

```
https://cah-gcs-api.herokuapp.com/api/v1/pack/:id
```

> Replace the `id` parameter with the ID of the expansion pack you want. See [how to get the expansion pack ID](#list-all-the-official-packs).

This returns a **JSON** with the following structure:

``` json
{
  "pack": {
    "name": "Expansion Pack Name",
    "id": "expansion_pack_id"
  },
  "black": [
    {
      "content": "Black card text.",
      "pick": 1,
      "draw": 1
    },
    ...
  ],
  "white": [
    "White card text.",
    ...
  ],
  "quantity": {
    "black": 5,
    "white": 35,
    "total": 40
  }
}
```

Each black (or prompt) card is represented as an *object* with it's *text content* and it's special rules (how many white cards you can *pick* and how many cards you *draw* after playing the round).

### List a Certain Type of Packs

Cards Against Humanity has a wide variety of third-party cards that are also available.

You can request a list of all the available packs of a certain type with:

```
https://cah-gcs-api.herokuapp.com/api/v1/:type
```

> Replace the `type` parameter with the type of expansion packs you need. See [Expansion Pack Types](#expansion-pack-types) to learn which types you can request.

This returns a **JSON** with the following structure:

``` json
{
  "packs": [
    {
      "name": "Expansion Pack Name",
      "id": "expansion_pack_id",
      "quantity": {
        "black": 10,
        "white": 15,
        "total": 25
      }
    },
    ...
  ]
}
```

### Single Typed Card Pack

You can request a single card pack from a certain type with:

```
https://cah-gcs-api.herokuapp.com/api/v1/type?id=$id
```

> Replace `type` with the type of the expansion pack and the `id` query parameter with the ID of the expansion pack you want. See [List a Certain Type of Packs](#list-a-certain-type-of-packs).

This returns a **JSON** with the following structure:

``` json
{
  "pack": {
    "name": "Expansion Pack Name",
    "id": "expansion_pack_id"
  },
  "black": [
    {
      "content": "Black card text.",
      "pick": 1,
      "draw": 1
    },
    ...
  ],
  "white": [
    "White card text.",
    ...
  ],
  "quantity": {
    "black": 5,
    "white": 35,
    "total": 40
  }
}
```

### Random Pairs

You can request a number (up to 100) of random card pairs with:

```
https://cah-gcs-api.herokuapp.com/api/v1/random?n=$number
```

> Replace the `number` query parameter with the number of random pairs you want. This query parameter is optional and its default value is `1`.

This returns an *array* with the following structure:

``` json
[
  {
    "index":0,
    "black": {
      "content":"Black card text.",
      "origin": {
        "name":"Expansion Pack Name",
        "id":"expansion_pack_id"
      },
      "pick":1,
      "draw":1
    },
    "white":{
      "content":"White card text.",
      "origin":{
        "name":"Expansion Pack Name",
        "id":"expansion_pack_id"
      }
    }
  },
  ...
]
```

Currently the random cards are only pulled from the official card expansions.

## Expansion Pack Types

The current expansion pack types available are:

* `official`
* `third_party`

## Future Improvements

As stated previously, this API is not finished, we're still missing lots of third-party pack expansions. We're also planning on bringing a custom card upload feature.
