import { Schema, model }  from 'mongoose'

const messageSchema = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    read: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
    }
);

messageSchema.index({
    chat: 1,
    createdAt: 1,
})

export default model('Message', messageSchema);