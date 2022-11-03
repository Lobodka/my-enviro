const express = require('express');
const router = express.Router();
const db = require("../model/helper"); // added during scaffolding


/* GET all data */
// not used in app, just wrote to test it
router.get('/', function(req, res, next) {
  db("SELECT * FROM enviro_data;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});

/* GET data by ZIP */
router.get("/:zip", async function(req, res, next) {
  const sql = `SELECT * FROM enviro_data WHERE zip = ${req.params.zip}`;

  try {
    let result = await db(sql); // run the sql command: look for data by zip
    if (result.data.length === 0) {
      // if the resulting array is empty, zip doesn't exist: return error
      res.status(404).send({ error: "ZIP code not found, please try again." });
    } else {
      res.status(200).send(result.data[0]); // send successful status and data to client
    }
  } catch (error) {
    // else send error if fails
    res.status(500).send({ error: error.message });
  }
});

/* GET data by city */
router.get("/:zip/city", async function(req, res, next) {
  // let cityName = req.params.city;

  // const sql = `SELECT * FROM enviro_data WHERE city = ${cityName}`;

  // try {
  //   let result = await db(sql); // run the sql command: look for data by city
  //   if (result.data.length === 0) {
  //     // if the resulting array is empty, city doesn't exist: return error
  //     res.status(404).send({ error: "City not found, please try again." });
  //   } else {
  //     res.status(200).send(result.data[0]); // send successful status and data to client
  //   }
  // } catch (error) {
  //   // else send error if fails
  //   res.status(500).send({ error: error.message });
  // }

 // POKEMON code to get attacks of Pokemon with spec'd ID
  const pokemon = data.find(e => +e.id === +req.params.id) 
  if (pokemon) {
    res.send(pokemon.attacks); 
  } else {
    res.status(404).send("Pokemon does not exist");
  }
});


module.exports = router;
