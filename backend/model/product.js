const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter product category!"],
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  discountPrice: {
    type: Number,
    required: [true, "Please enter discounted price!"],
  },
  originalPrice: {
    type: Number,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        default: 0,
      },
      comment: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
