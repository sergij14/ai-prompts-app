import { Types } from "mongoose";

export interface FormPrompt {
  prompt: string;
  tag: string;
}

export interface Prompt extends FormPrompt {
  author: string;
  authorImg: string;
  userDatabaseID: Types.ObjectId;
}

export interface PromptFromDB extends Prompt {
  _id: Types.ObjectId;
}

export interface User {
  email: string | null;
  username: string;
  image: string;
  userID: string;
}

export interface UserFromDB extends User {
  _id: Types.ObjectId;
}
