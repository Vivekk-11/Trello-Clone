"use client";

import { createBoard } from "@/actions/create-board";
import { useFormState } from "react-dom";
import FormInput from "./FormInput";
import FormButton from "./FormButton";

const Form = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);
  console.log("State", state, "dispatch", dispatch);
  return (
    <form action={dispatch}>
      <FormInput errors={state?.errors} />
      <FormButton />
    </form>
  );
};

export default Form;
