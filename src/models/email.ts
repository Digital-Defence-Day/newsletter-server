import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
        validator: (val: string) => val.trim().match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
        message: 'Provided email is invalid.'
    }
  },
  metaData: {
    type: JSON,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const EmailSchema = mongoose.model("Email", Schema);
