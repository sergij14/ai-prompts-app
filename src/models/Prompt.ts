import { PromptFromDB } from "@/types";
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema<PromptFromDB>({
  userDatabaseID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ref is required."],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  author: {
    type: String,
    required: [true, "Author is required."],
  },
  authorImg: {
    type: String,
    required: [true, "Creator Image is required."],
  },
});

const getModel = () => model("Prompt", PromptSchema);

export const PromptModel = (models.Prompt || getModel()) as ReturnType<
  typeof getModel
>;
