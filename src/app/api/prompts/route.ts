import PromptModel from "@/models/Prompt";
import { connectToDB } from "@/utils/connectToDB";

export async function POST(req: Request) {
  const promptData = await req.json();

  try {
    await connectToDB();
    const newPrompt = new PromptModel({
      ...promptData,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("user-id");
  const query = userID ? { userDatabaseID: userID } : {};

  try {
    await connectToDB();
    const prompts = await PromptModel.find({ ...query });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    await connectToDB();
    await PromptModel.findByIdAndRemove(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
