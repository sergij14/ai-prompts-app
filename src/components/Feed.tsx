"use client";

import { useEffect, useState } from "react";
import { PromptFromDB } from "@/types";
import PromptCardList from "./PromptCardList";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

type SearchProps = {
  term: string;
  result: PromptFromDB[];
  timeout: ReturnType<typeof setTimeout> | null;
};

const Feed = () => {
  const [prompts, setPrompts] = useState<PromptFromDB[]>([]);
  const [{ term, result, timeout }, setSearch] = useState<SearchProps>({
    term: "",
    result: [],
    timeout: null,
  });

  const fetchPrompts = async () => {
    const res = await fetch("/api/prompts");
    const data: PromptFromDB[] = await res.json();

    setPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const filterPrompts = (searchTerm: string) => {
    const regex = new RegExp(searchTerm, "i");

    setSearch((prev) => ({
      ...prev,
      result: prompts?.filter(
        (item) =>
          regex.test(item.author) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      ),
    }));
  };

  const handleTagClick = (tag: string) => {
    filterPrompts(tag);
    setSearch((prev) => ({ ...prev, term: tag }));
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout) clearTimeout(timeout);

    const { value } = ev.target;
    setSearch((prev) => ({
      ...prev,
      term: value,
      timeout: setTimeout(() => {
        filterPrompts(value);
      }, 500),
    }));
  };

  return (
    <div className="my-8">
      <div className="relative max-w-md mx-auto">
        <div className="absolute top-4 left-4 pointer-events-none">
          <MagnifyingGlassIcon width={20} />
        </div>
        <input
          onChange={handleSearch}
          value={term}
          type="text"
          className="search-input"
          placeholder="Search prompts..."
        />
      </div>
      <PromptCardList handleTagClick={handleTagClick} data={term ? result : prompts} />
    </div>
  );
};

export default Feed;
