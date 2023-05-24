import {PromptModel} from "@/models/Prompt";
import { connectToDB } from "@/utils/connectToDB";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    await connectToDB();
    const prompt = await PromptModel.findById(id);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
