"use client";

import { PromptFromDB } from "@/types";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

type PromptListProps = {
  data: PromptFromDB[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptListProps) => {
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
      {data.map(({ prompt, _id, tag, author }) => {
        const promptID = _id?.toString();

        return (
          <div key={_id} className="prompt-card">
            <div className="flex justify-between mb-4">
              <div className="flex gap-2 justify-center items-center">
                <span className="text-sm">{author}</span>
              </div>
              <button onClick={() => handleCopy({ prompt, promptID })}>
                {promptID === copied ? (
                  <ClipboardDocumentCheckIcon
                    className="text-green-500"
                    width={20}
                  />
                ) : (
                  <ClipboardDocumentIcon
                    className="text-orange-500"
                    width={20}
                  />
                )}
              </button>
            </div>
            <p>{prompt}</p>
            <div className="flex justify-between mt-4">
              <p
                onClick={() => handleTagClick(tag)}
                className="text-blue-500 cursor-pointer"
              >
                {"#" + tag}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PromptCardList;
