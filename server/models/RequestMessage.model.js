const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    message: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' } //ref: User.sender del Request model??
},
    {
        timestamps: true
    }
);
const RequestMessage = model("RequestMessage", messageSchema);
module.exports = RequestMessage;