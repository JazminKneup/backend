const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pet must have a name."],
    minlength: [3, "Name must be at least 3 characters."],
    unique: [true, "Pet name must be unique."]
  },
  type: {
    type: String,
    required: [true, "Pet must have a type."],
    minlength: [3, "Type must be at least 3 characters."]
  },
  description: {
    type: String,
    required: [true, "Pet must have a description."],
    minlength: [3, "Description must be at least 3 characters."]
  },
  skillOne: String,
  skillTwo: String,
  skillThree: String
}, { timestamps: true });

const Pet = mongoose.model("Pet", PetSchema);
module.exports = Pet;
