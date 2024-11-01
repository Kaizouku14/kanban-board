import mongoose, { Schema, model, models } from "mongoose";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("database connected succesfully");
  })
  .catch(() => {
    console.log("database connection failed");
  })
;

const User = models.User || model(
  "User",
  new Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

const SessionSchema = models.Session || model(
  "Session",
  new Schema(
    {
      user_id: {
        type: String,
        required: true,
      },
      expires_at: {
        type: Date,
        required: true,
      },
    },
  )
);

// Create the MongoDB adapter
const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),      
  mongoose.connection.collection("users")   
);

export { User, SessionSchema, adapter };
