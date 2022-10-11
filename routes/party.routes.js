const Party = require('../models/party.model');
const User = require('../models/User.model');
const router = require("express").Router();

router.get("parties/viewparty", (req, res, next) => {
    const {partyId} = req.params;
  
    Party.findById(partyId)
    .then((Party) => res.status(200).json(party))
    .catch ((err) => res.json(err))
  });
router.get("/parties/all", async(req, res, next) => {
    try {
      
      const users = await User.find({})
      res.status(200).send(users)
    } catch (error) {
      res.status(400).json({message:"server error",error:error})
    }
    
  });
  

router.post('/parties/addparty', (req, res, next) => {
    const { title, location, description, theme, requests } = req.body;
  
   Party.create({ title, location, description, theme, requests })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
  });
  

  
  router.put("/parties/edit", (req, res, next) => {
    const {partyId} = req.params;
    const { title, location, description, theme, requests } = req.body;
  
    Party.findByIdAndUpdate(
      partyId,
      { title, location, description, theme, requests },
      { new: true }
    )
    .then((user) => res.status(200).json(party))
    .catch((err) => res.json (err))
  });
  
  router.delete("/parties/delete", (req, res, next) => {
    const {partyId} = req.params;
  
    User.findByIdAndRemove(partyId)
    .then(() => res.redirect("/signin"))
    .catch((err) => res.json(err))
  });

  module.exports = router;