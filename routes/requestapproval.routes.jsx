const router = require("express").Router();
const User = require("../models/User.model");
const Request = require("../models/Request.model");

router.post("/request/:id", async (req, res, next) => {
    console.log("pls work");
    const {id} = req.params
    const userId = req.session.user._id 


    try {
        /* console.log("Current User Id: ", userId) */
        
         await User.findByIdAndUpdate(userId, {
            $push: {
                requestSent: id
            }
        }, {new: true});
        
        const otherUser = await User.findById(id)

       
        
        if (otherUser.matchRecieved.includes(userId)) {
            await User.findByIdAndUpdate(otherUser._id, {
                $pull: {
                    requestRecieved: userId
                },
                $push: {
                    requests: userId
                }
            })
            await User.findByIdAndUpdate(userId, {
                $pull: {
                 requestRecieved: otherUser._id
                 },
                $push: {
                 requests: otherUser._id
                 }
            })
        } else {
            await User.findByIdAndUpdate(id, {
                $push: {
                    requestRecieved: userId
                }
            })
        }

        res.redirect(req.get('referer'))

    } catch (error) {
        next(error)
    }
   
    });







module.exports = router;