"use client";

import { useState } from "react";
import { PromptFromDB } from "@/types";
import PromptCardList from "./PromptCardList";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import Loader from "./Loader";

type SearchProps = {
  term: string;
  timeout: ReturnType<typeof setTimeout> | null;
  result: PromptFromDB[];
};

const Feed = () => {
  const [{ term, result, timeout }, setSearch] = useState<SearchProps>({
    term: "",
    result: [],
    timeout: null,
  });

  const fetchPrompts = async (url: string) => {
    const res = await fetch(url);
    const data: PromptFromDB[] = await res.json();

    return data;
  };

  const {
    data: prompts,
    error,
    isLoading,
  } = useSWR<PromptFromDB[]>("/api/prompts", fetchPrompts, {
    revalidateOnFocus: false,
  });

  const filterPrompts = (searchTerm: string) => {
    const regex = new RegExp(searchTerm, "i");

    if (prompts) {
      setSearch((prev) => ({
        ...prev,
        result: prompts.filter(
          ({ author, tag, prompt }) =>
            regex.test(author) || regex.test(tag) || regex.test(prompt)
        ),
      }));
    }
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
      <div className="relative my-8 max-w-md mx-auto">
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
      {prompts && (
        <PromptCardList
          handleTagClick={handleTagClick}
          data={term ? result : prompts}
        />
      )}
      {isLoading && <Loader message="Fetching prompts..." />}
    </div>
  );
};

export default Feed;
