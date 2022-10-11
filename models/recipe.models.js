const { Schema, model } = require("mongoose");


const recipeSchema = new Schema(
  {
   
    "cuisine":{ Boolean, String },
    "ingredients":{ Boolean,  String }, 
    " recipe.url": String ,
    " recipe.label": String ,
 
 }
);

const User = model("Recipe", recipeSchema);

module.exports = Recipe;