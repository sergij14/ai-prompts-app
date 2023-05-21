import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
  userID: {
    type: String,
    required: [true, "User ID is required!"],
  },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
