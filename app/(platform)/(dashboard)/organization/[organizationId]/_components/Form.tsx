"use client";

import { createBoard } from "@/actions/create-board";
import FormInput from "@/components/form/FormInput";
import FormButton from "./FormButton";
import { useAction } from "@/hooks/use-action";

const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log("Data", data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <FormInput label="Board Title" id="title" errors={fieldErrors} />
      <FormButton />
    </form>
  );
};

export default Form;
