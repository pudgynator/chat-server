import { Schema, model} from 'mongoose';

const contactSchema = new Schema({
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
    }
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