
const Parties = require("../models/party.model");
const router = require("express").Router();


router.post("/search/searchparty", (req, res, next) => {
  const {parameters, search} = req.body
  console.log(parameters, search)
  Parties.find({[parameters]: search})
  .then((parties) => {
    console.log(parties)
    res.render("resultsearch", {parties})
  })
  .catch((error) => (error));
});




module.exports = router;