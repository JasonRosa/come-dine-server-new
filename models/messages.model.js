const { Schema, model } = require("mongoose");


const messagesSchema = new Schema(

    {
        author: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        "content": String,
      }


 

);

const Messages = model("Messages", messagesSchema);

module.exports = Messages;