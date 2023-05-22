"use client";

import Form from "@/components/Form";
import { useSearchParams } from "next/navigation";

export default function PromptEdit() {
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");

  console.log(promptID);

  return (
    <div>
      <Form />
    </div>
  );
}
