export type Prompt = {
  creator: string;
  prompt: string;
  tag: string;
};

export type PromptFromDB = Prompt & {
  creatorImg: string;
  userDatabaseID: string;
  _id: string;
};
