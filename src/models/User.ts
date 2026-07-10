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
},
{
    timestamps: true,
}
);

export default model('User', userSchema);