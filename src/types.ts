export type Prompt = {
  prompt: string;
  tag: string;
};

export type PromptFromDB = Prompt & {
  author: string;
  authorImg: string;
  _id: string;
  userDatabaseID: string;
};
