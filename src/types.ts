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

export type UserFromDB = {
  email: string | null;
  username: string;
  image: string;
  userID: string;
  _id: string;
};
