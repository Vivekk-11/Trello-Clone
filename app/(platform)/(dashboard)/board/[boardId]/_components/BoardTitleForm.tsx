"use client";

import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import React, { ElementRef, useRef, useState } from "react";

interface BoardTitleFormProps {
  board: Board;
}

const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title");
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          onBlur={onBlur}
          ref={inputRef}
          id="title"
          defaultValue={board.title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {board.title}
    </Button>
  );
};

export default BoardTitleForm;
