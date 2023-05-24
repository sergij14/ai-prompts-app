"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormPrompt, PromptFromDB } from "@/types";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  ArrowPathIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { promptSchema } from "./schemas";
import { useSession } from "next-auth/react";

const Form = ({ editPromptData }: { editPromptData?: PromptFromDB }) => {
  const { tag, prompt, _id, userDatabaseID, author, authorImg } =
    editPromptData || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPrompt>({
    resolver: yupResolver(promptSchema),
    defaultValues: editPromptData ? { tag, prompt } : {},
  });

  const router = useRouter();
  const { data: session } = useSession();
  const { user } = session || {};

  const handleReset = () => reset({ tag: "", prompt: "" });

  const { method, reqBody, submitText, SubmitIcon } = {
    method: editPromptData ? "PATCH" : "POST",
    submitText: editPromptData ? "Edit" : "Create",
    SubmitIcon: editPromptData ? PencilSquareIcon : PlusIcon,
    reqBody: editPromptData
      ? { userDatabaseID, author, authorImg }
      : {
          userDatabaseID: user?.userDatabaseID,
          author: user?.username,
          authorImg: user?.image,
        },
  };

  const onSubmit = async (data: FormPrompt) => {
    try {
      await fetch(editPromptData ? `/api/prompts?id=${_id}` : "/api/prompts", {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          ...reqBody,
        }),
      });

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-center my-8"
    >
      <div className="w-full max-w-md">
        <label htmlFor="prompt" className="block mb-2 text-sm font-medium">
          Prompt:
        </label>

        <textarea
          className={`input w-full min-h-[120px] max-h-[200px]  ${
            errors.prompt && "border-red-500 focus:border-red-500"
          }`}
          {...register("prompt")}
        ></textarea>
        <p className="field-error">{errors.prompt?.message}</p>
      </div>

      <div className="w-full max-w-md">
        <label htmlFor="tag" className="block mb-2 text-sm font-medium">
          Tag:
        </label>
        <input
          className={`input w-full ${
            errors.tag && "border-red-500 focus:border-red-500"
          }`}
          {...register("tag")}
        />
        <p className="field-error">{errors.tag?.message}</p>
      </div>

      <div className="flex gap-2 items-start">
        <button
          className="btn-light flex gap-2 items-center"
          type="button"
          onClick={handleReset}
        >
          <ArrowPathIcon width={22} />
          Reset
        </button>
        <button className="btn-default flex gap-2 items-center" type="submit">
          <SubmitIcon width={22} />
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default Form;
