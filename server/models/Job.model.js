const { Schema, model } = require("mongoose");
const jobSchema = new Schema(
  {
    jobType: String,
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [{ type: Schema.Types.ObjectId, ref: "RequestMessage" }],
    status: {
      type: String,
      enum: [
        "rechazada",
        "pendiente de aprobación",
        "En proceso",
        "En espera",
        "Terminado",
        "En envio",
      ], //TODO
    },
    description: String,
    deliveryAdress: {},
  },
  {
    timestamps: true,
  }
);
const Job = model("Job", jobSchema);
module.exports = Job;
