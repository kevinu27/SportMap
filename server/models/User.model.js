const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: String,
    surname: String,
    pwd: String,
    role: String,
    email: {
      type: String,
      unique: true,
    },
    image: [String],
    description: String,
    machines: [
      {
        name: String,
        imageUrl: String,
        dimensions: [Number],
        technology: String,
        accuracy: String,
        materials: String,
        colors: [String],
      },
    ],
    rating: Number,
    location: {
      type: { type: String },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.index({ location: "2dsphere" });
const User = model("User", userSchema);
module.exports = User;
