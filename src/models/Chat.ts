import { Schema, model, Document, Types} from 'mongoose';

export interface IChat extends Document {
    members: Types.ObjectId[];
    isGroup: boolean;
    name?: string;
    avatar?: string;
    admin?: Types.ObjectId;
    lastMessage?: string;
    lastMessageSender?: Types.ObjectId;
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

