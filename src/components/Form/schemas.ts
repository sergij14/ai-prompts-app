import * as yup from "yup";

export const promptSchema = yup
  .object({
    prompt: yup
      .string()
      .required("Prompt is required field")
      .min(20, "Minimum number of Prompt characters is 20"),
    tag: yup.string().required("Tag is a required field"),
  })
  .required();
