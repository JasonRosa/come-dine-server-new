const { Schema, model } = require("mongoose");


const requestSchema = new Schema(


{
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    "bringWhat": String,
    "inviteMe": Boolean,
    "pending": Boolean,
    "content": String,
  }

);

const Request = model("request", requestSchema);

module.exports = Request;