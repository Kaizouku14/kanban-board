import mongoose from "mongoose";

function dbConnection() {

  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log("database connected succesfully"))
    .catch((err) => console.log("error while connecting", err));

  mongoose.connection.on("disconnected", () =>
    console.log("Mongodb connection disconnected")
  );
}

export default dbConnection;
