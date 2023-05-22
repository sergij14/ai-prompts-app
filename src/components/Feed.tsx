"use client";

import { useState } from "react";
import { PromptFromDB } from "@/types";
import PromptCardList from "./PromptCardList";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";
import useSWR, { useSWRConfig } from "swr";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

type SearchProps = {
  term: string;
  timeout: ReturnType<typeof setTimeout> | null;
  result: PromptFromDB[];
};

type FeedProps = {
  fetchUrl: string;
  isEditable?: boolean;
};

const Feed = ({ fetchUrl, isEditable = false }: FeedProps) => {
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
  } = useSWR<PromptFromDB[]>(fetchUrl, fetchPrompts, {
    revalidateOnFocus: false,
  });
  const { mutate } = useSWRConfig();
  const router = useRouter();

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

  const handleEdit = (_id?: string) => {
    router.push(`prompt-edit?id=${_id}`);
  };

  const handleDelete = async (_id?: string) => {
    try {
      await fetch(`/api/prompts?id=${_id}`, {
        method: "DELETE",
      });
      mutate("/api/prompts", true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchClear = () => setSearch((prev) => ({ ...prev, term: "" }));

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
        <div className="absolute top-2/4 tranform -translate-y-2/4 left-4 pointer-events-none">
          <MagnifyingGlassIcon width={22} />
        </div>
        <input
          onChange={handleSearch}
          value={term}
          type="text"
          className="search-input"
          placeholder="Search prompts..."
        />
        {term && (
          <button
            onClick={handleSearchClear}
            className="absolute top-2/4 tranform -translate-y-2/4 right-4 z-10 cursor-pointer text-gray-400 opacity-70 hover:opacity-100"
          >
            <XCircleIcon width={22} />
          </button>
        )}
      </div>
      {prompts && prompts.length > 0 && (
        <PromptCardList
          isEditable={isEditable}
          handleDelete={handleDelete}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          data={term ? result : prompts}
        />
      )}
      {isLoading && <Loader message="Fetching prompts..." />}
    </div>
  );
};

export default Feed;
