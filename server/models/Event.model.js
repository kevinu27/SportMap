const { Schema, model } = require("mongoose");
const eventSchema = new Schema(
  {
    sportName: String,
    image: [String],
    description: String,
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
eventSchema.index({ location: "2dsphere" });
const Event = model("Event", eventSchema);
module.exports = Event;
