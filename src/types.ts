export type Prompt = {
  prompt: string;
  tag: string;
  author: string;
};

export type PromptFromDB = Prompt & {
  _id: string;
};
