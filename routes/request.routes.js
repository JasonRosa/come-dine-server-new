const Request = require('../models/request.model')
const router = require("express").Router();


router.post('/request/create', (req, res, next) => {
    const {author, bringWhat, inviteMe, pending, content, userId, partyId} = req.body;
  
    Request.create({ author, bringWhat, inviteMe, pending, content, userId, partyId })
    .then((newRequest) => {
      return Request.findByIdAndUpdate(requestId, { $push: {requests: newRequest._id} });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
  });

  router.get("/request", (req, res, next) => {
    const {userId} = req.params;
  
    User.findById(userId)
    .then((User) => res.status(200).json(user))
    .catch ((err) => res.json(err))
  });

  router.put("/request/edit", (req, res, next) => {
   {/*const {userId} = req.params;*/}
    const { author, bringWhat, inviteMe, pending, content, userId, partyId} = req.body;
  
    User.findByIdAndUpdate(
      userId,
      { author, bringWhat, inviteMe, pending, content, userId, partyId },
      { new: true }
    )
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json (err))
  });
  
  router.delete("/request/delete", (req, res, next) => {
    const {userId} = req.params;
  
    User.findByIdAndRemove(userId)
    .then(() => res.redirect("/profile"))
    .catch((err) => res.json(err))
  });

  module.exports = router;