import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    return;
  }

  const DB_STRING = process.env.DB!;
  const DB_PASS = process.env.DB_PASSWORD!;

  const DB_URI = DB_STRING.replace("<password>", DB_PASS);

  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
  } catch (err) {
    console.log("Couldn't connect to db");
  }
};
