import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  userID: {
    type: String,
    required: [true, "User ID is required!"],
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
