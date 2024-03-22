"use client";
import React from "react";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  errors?: {
    title?: string[];
  };
}

const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col space-y-2">
      <input
        type="text"
        name="title"
        id="title"
        required
        placeholder="Enter a board title"
        className="border-black border p-1 outline-none"
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((error: string) => (
            <div key={error} className="text-rose-500">
              {error}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
