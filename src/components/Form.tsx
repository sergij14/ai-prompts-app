"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Prompt, promptSchema } from "@/types";
import { useRouter } from "next/navigation";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

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

  const handleReset = () => reset({ tag: "", author: "", prompt: "" });

  const onSubmit = async (data: Prompt) => {
    try {
      await fetch("/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-center"
    >
      <div className="w-full max-w-md">
        <label htmlFor="tag" className="block mb-2 text-sm font-medium">
          Author:
        </label>
        <input
          className={`input w-full ${errors.tag && "border-red-500"}`}
          {...register("author")}
        />
        <p className="text-red-500">{errors.tag?.message}</p>
      </div>

      <div className="w-full max-w-md">
        <label htmlFor="prompt" className="block mb-2 text-sm font-medium">
          Prompt:
        </label>

        <textarea
          className={`input w-full min-h-[120px] max-h-[200px]  ${
            errors.tag && "border-red-500"
          }`}
          {...register("prompt")}
        ></textarea>
        <p className="text-red-500">{errors.prompt?.message}</p>
      </div>

      <div className="w-full max-w-md">
        <label htmlFor="tag" className="block mb-2 text-sm font-medium">
          Tag:
        </label>
        <input
          className={`input w-full ${errors.tag && "border-red-500"}`}
          {...register("tag")}
        />
        <p className="text-red-500">{errors.tag?.message}</p>
      </div>

      <div className="flex gap-2 items-start">
        <button
          className="btn-light flex gap-2 items-center"
          type="button"
          onClick={handleReset}
        >
          <ArrowPathIcon width={16} />
          Reset
        </button>
        <button className="btn-default flex gap-2 items-center" type="submit">
          <PlusIcon width={16} />
          Create
        </button>
      </div>
    </form>
  );
};

export default Form;
