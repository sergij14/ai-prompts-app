"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Prompt, PromptFromDB, promptSchema } from "@/types";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Prompt>({
    resolver: yupResolver(promptSchema),
  });
  const [prompts, setPrompts] = useState<PromptFromDB[]>([]);

  const onSubmit = async (data: Prompt) => {
    try {
      await fetch("/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPrompts = async () => {
    const res = await fetch("/api/prompts");
    const data: PromptFromDB[] = await res.json();

    setPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <>
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

        <button className="btn-default" type="submit">
          Create
        </button>
      </form>

      {prompts.map((item) => (
        <div>
          <p>{item.tag}</p>
          <p>{item.prompt}</p>
        </div>
      ))}
    </>
  );
};

export default Form;
