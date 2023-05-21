import * as yup from "yup";

export const promptSchema = yup
  .object({
    prompt: yup.string().required(),
    tag: yup.string().required(),
    author: yup.string().required(),
  })
  .required();

export type Prompt = {
  prompt: string;
  tag: string;
  author: string;
};

export type PromptFromDB = Prompt & {
  _id: string;
};
