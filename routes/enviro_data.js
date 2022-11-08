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
router.get("/zip/:zip", async function(req, res, next) {
  const sql = `SELECT * FROM enviro_data WHERE zip = '${req.params.zip}'`;

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
router.get("/city/:city_name", async function(req, res, next) {
  const sql = `SELECT * FROM enviro_data WHERE city LIKE '%${req.params.city_name}%'`; // gets cities that contain the name 

  try {
    let result = await db(sql); // run the sql command: look for data by city
    if (result.data.length === 0) {
      // if the resulting array is empty, city doesn't exist: return error
      res.status(404).send({ error: "City not found, please try again." });
    } else {
      res.status(200).send(result.data); // send successful status and data to client
    }
  } catch (error) {
    // else send error if fails
    res.status(500).send({ error: error.message });
  }
});

/* GET all minimum/maximum/average values by city */
router.get( "/city/:city_name/citystats", async function(req, res, next) {
  const sql = `SELECT ROUND(MIN(air)) AS min_air,ROUND(MAX(air)) AS max_air,ROUND(AVG(air)) AS avg_air, 
                      ROUND(MIN(haz_cleanups)) AS min_haz_cleanups,ROUND(MAX(haz_cleanups)) AS max_haz_cleanups,ROUND(AVG(haz_cleanups)) AS avg_haz_cleanups,
                      ROUND(MIN(lead_paint)) AS min_lead_paint,ROUND(MAX(lead_paint)) AS max_lead_paint,ROUND(AVG(lead_paint)) AS avg_lead_paint,
                      ROUND(MIN(water)) AS min_water,ROUND(MAX(water)) AS max_water,ROUND(AVG(water)) AS avg_water
                      FROM enviro_data WHERE city LIKE '%${req.params.city_name}%'`; 
  try {
    let result = await db(sql); 
    if (result.data.length === 0) {
      res.status(404).send({ error: "City not found, please try again." });
    } else {
      res.status(200).send(result.data); 
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
