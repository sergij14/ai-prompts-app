"use client";

import { useEffect, useState } from "react";
import { PromptFromDB } from "@/types";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [prompts, setPrompts] = useState<PromptFromDB[]>([]);
  const fetchPrompts = async () => {
    const res = await fetch("/api/prompts");
    const data: PromptFromDB[] = await res.json();

    setPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div>
      <PromptCardList data={prompts} />
    </div>
  );
};

export default Feed;
