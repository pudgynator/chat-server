import { Schema, model } from "mongoose";

const userSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
},
{
    timestamps: true,
}
);

export default model('User', userSchema);