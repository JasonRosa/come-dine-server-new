const User = require("../models/User.model");
const Conversation = require('../models/Conversation.model')
const Messages = require('../models/messages.model')
const router = require("express").Router();


router.post("/chat/create/:otherUserId", (req, res, next) => {
    const {otherUserId} = req.params
    const user = req.session.user
  
    const id = user._id
  
    Conversation.findOne({ participants: {$all: [otherUserId, id]}})
    .then((foundConversation) => {
        if(foundConversation === null){
            Conversation.create({participants: [otherUserId, user._id]})
            .then((conversation) => {
                console.log(conversation)
                res.redirect(`/chat/${conversation._id}`)
            }).catch(err => next(err))
        }else {
            res.redirect(`/chat/${foundConversation._id}`)
        }
    })
    .catch((err) => next(err))
  
  });

  router.get("/chat/:id", (req, res, next) => {
    const {userId} = req.params;
  
    User.findById(userId)
    .then((User) => res.status(200).json(user))
    .catch ((err) => res.json(err))
  });
  
  module.exports = router;