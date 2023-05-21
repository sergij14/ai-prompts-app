"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Prompt } from "@/types";
import { useRouter } from "next/navigation";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { promptSchema } from "./schemas";
import { useSession } from "next-auth/react";

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Prompt>({
    resolver: yupResolver(promptSchema),
  });

  const router = useRouter();
  const { data: session } = useSession();

  const handleReset = () => reset({ tag: "", prompt: "" });

  const onSubmit = async (data: Prompt) => {
    const {
      userDatabaseID,
      user: { name, image },
    } = session || {};

    try {
      await fetch("/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userDatabaseID,
          author: name,
          authorImg: image,
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
          <PlusIcon width={22} />
          Create
        </button>
      </div>
    </form>
  );
};

export default Form;
