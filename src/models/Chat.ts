import { Schema, model} from 'mongoose';

export interface IChat extends Document {
    members: Schema.Types.ObjectId[];
    isGroup: boolean;
    name?: string;
    avatar?: string;
    admin?: Schema.Types.ObjectId;
    lastMessage?: string;
    lastMessageSender?: Schema.Types.ObjectId;
}

const chatSchema = new Schema<IChat>({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    isGroup: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: '',

    },
    avatar: {
        type: String,
        default: '',
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    lastMessage: {
        type: String,
    },
    lastMessageSender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    },
    {
        timestamps: true,
    }
);

export default model('Chat', chatSchema);

