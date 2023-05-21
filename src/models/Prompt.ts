import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
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
});

const PromptModel = models.Prompt || model("Prompt", PromptSchema);

export default PromptModel;
