"use client";

import Form from "@/components/Form";
import Loader from "@/components/Loader";
import { PromptFromDB } from "@/types";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function PromptEdit() {
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");

  const fetchPrompt = async (url: string) => {
    const res = await fetch(url);
    const data: PromptFromDB = await res.json();

    return data;
  };

  const {
    data: prompt,
    error,
    isLoading,
  } = useSWR<PromptFromDB>(
    promptID ? `/api/prompt?id=${promptID}` : null,
    fetchPrompt,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div>
      {isLoading ? (
        <Loader message="Fetching prompt..." />
      ) : (
        <Form editPromptData={prompt} />
      )}
    </div>
  );
}
