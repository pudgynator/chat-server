import { Schema, model, Document, Types} from 'mongoose';

export interface IContact extends Document {
    owner: Types.ObjectId | string;
    contact: Types.ObjectId | string;
    name: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const contactSchema = new Schema<IContact>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
},
    {
        timestamps: true,
    }
)

contactSchema.index(
    {
        owner: 1,
        contact: 1,
    },
    {
        unique: true,
    }
);

export default model('Contact', contactSchema);