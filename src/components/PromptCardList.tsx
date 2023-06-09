"use client";

import { PromptFromDB } from "@/types";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

type PromptListProps = {
  data: PromptFromDB[];
  handleTagClick: (tag: string) => void;
  handleDelete: (id?: string) => void;
  handleEdit: (id?: string) => void;
  isEditable?: boolean;
};

const PromptCardList = ({
  data,
  handleTagClick,
  handleDelete,
  handleEdit,
  isEditable,
}: PromptListProps) => {
  const [copied, setCopied] = useState<string>();

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
      {data.map(({ prompt, _id, tag, author, authorImg }) => {
        const promptID = _id?.toString();

        return (
          <div key={promptID} className="relative">
            <div className="prompt-card">
              <div className="flex justify-between mb-4">
                <div className="flex gap-2 justify-center items-center">
                  <Image
                    alt={author}
                    width={24}
                    height={24}
                    className="rounded-full"
                    src={authorImg}
                  />
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
              <p
                className="text-blue-500 cursor-pointer mt-1"
                onClick={() => handleTagClick(tag)}
              >
                {"#" + tag}
              </p>
              {isEditable && (
                <div className="flex justify-between mt-2">
                  <button
                    className="text-red-500 opacity-70 hover:opacity-100 flex items-center gap-1"
                    onClick={() => handleDelete(promptID)}
                  >
                    <XCircleIcon width={22} />
                    Delete
                  </button>
                  <button
                    className="text-blue-500 opacity-70 hover:opacity-100 flex items-center gap-1"
                    onClick={() => handleEdit(promptID)}
                  >
                    Edit
                    <PencilSquareIcon width={22} />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PromptCardList;
