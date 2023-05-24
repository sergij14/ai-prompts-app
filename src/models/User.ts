import { User } from "@/types";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<User>({
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

const getModel = () => model("User", UserSchema);

export const UserModel = (models.User || getModel()) as ReturnType<
  typeof getModel
>;
