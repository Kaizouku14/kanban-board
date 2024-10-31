import mongoose, { Schema, model, models } from "mongoose";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const sessionSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        expires_at: {
            type: Date,
            required: true
        }
    },
    { _id: false }
);

const User = models['kanban-users'] || model('kanban-users', userSchema);
const Session = models['sessions'] || model('sessions', sessionSchema);

const adapter = new MongodbAdapter(
    mongoose.connection.collection("sessions"),
    mongoose.connection.collection("kanban-users") 
);

export { User, Session, adapter };
