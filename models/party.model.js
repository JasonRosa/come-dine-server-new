const { Schema, model } = require("mongoose");


const partySchema = new Schema(

    {
        author: {
           type: Schema.Types.ObjectId,
           ref: "User"
         },
         title: { String, Boolean },
         location: { type: String, required: true},
         description: String,
         theme: { String, Boolean },
         requests: [{type: Schema.Types.ObjectId, ref: "Request"}]
    }


 

);

const Party = model("Party", partySchema);

module.exports = Party;