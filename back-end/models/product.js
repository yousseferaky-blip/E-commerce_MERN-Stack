const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    
    offer: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true, 
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Product", productSchema);
