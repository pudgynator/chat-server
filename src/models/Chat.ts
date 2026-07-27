import { Schema, model} from 'mongoose';

const chatSchema = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    lastMessage: {
        type: String,
    },
    lastMessageSender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
    },
    {
        timestamps: true,
    }
);

export default model('Chat', chatSchema);

