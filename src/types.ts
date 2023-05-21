export type Prompt = {
  prompt: string;
  tag: string;
};

export type PromptFromDB = Prompt & {
  creator: string;
  creatorImg: string;
  userDatabaseID: string;
  _id: string;
};
