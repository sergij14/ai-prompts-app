"use client";

import { PromptFromDB } from "@/types";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";

type PromptListProps = {
  data: PromptFromDB[];
  handleTagClick: (tag: string) => void;
  handleDelete: (id?: string) => void;
};

const PromptCardList = ({
  data,
  handleTagClick,
  handleDelete,
}: PromptListProps) => {
  const [copied, setCopied] = useState<string>();

  const { data: session } = useSession();

  const handleCopy = ({
    prompt,
    promptID,
  }: {
    prompt: string;
    promptID: string;
  }) => {
    if (promptID === copied) {
      return;
    }
    setCopied(promptID);
    navigator.clipboard.writeText(prompt);

    setTimeout(() => {
      setCopied(undefined);
    }, 4000);
  };

  return (
    <div className="prompt-list">
      {data.map(({ prompt, _id, tag, author, authorImg, userDatabaseID }) => {
        const promptID = _id?.toString();
        const isCurrentUser = session?.user.userDatabaseID === userDatabaseID;

        return (
          <div key={_id} className="relative">
            <div key={_id} className="prompt-card">
              <div className="flex justify-between mb-4">
                <div className="flex gap-2 justify-center items-center">
                  <img className="rounded-full w-6" src={authorImg} />
                  <span className="text-sm">{author}</span>
                </div>
                <button
                  className="opacity-70 hover:opacity-100"
                  onClick={() => handleCopy({ prompt, promptID })}
                >
                  {promptID === copied ? (
                    <ClipboardDocumentCheckIcon
                      className="text-green-500"
                      width={22}
                    />
                  ) : (
                    <ClipboardDocumentIcon
                      className="text-orange-500"
                      width={22}
                    />
                  )}
                </button>
              </div>
              <p>{prompt}</p>
              <div className="flex justify-between mt-4">
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {"#" + tag}
                </p>
                {isCurrentUser && (
                  <button
                    className="text-red-500 opacity-70 hover:opacity-100"
                    onClick={() => handleDelete(promptID)}
                  >
                    <XCircleIcon width={22} />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PromptCardList;
