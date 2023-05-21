import PromptModel from "@/models/Prompt";
import { Prompt } from "@/types";
import { connectToDB } from "@/utils/connectToDB";

export async function POST(req: Request) {
  const promptData: Prompt = await req.json();

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

export const GET = async () => {
  try {
    await connectToDB();
    const prompts = await PromptModel.find();

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
