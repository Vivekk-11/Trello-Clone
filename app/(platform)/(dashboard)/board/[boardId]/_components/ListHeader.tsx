"use client";

import FormInput from "@/components/form/FormInput";
import { List } from "@prisma/client";
import React, { ElementRef, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

interface ListHeaderProps {
  list: List;
}

const ListHeader = ({ list }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeydown);

  return (
    <div className="pt-2 px-2 text-xm font-semibold flex items-start justify-between gap-x-2">
      {isEditing ? (
        <form className="flex-1 px-[2px]">
          <input type="hidden" value={list.id} id="id" name="id" />
          <input
            type="hidden"
            value={list.boardId}
            id="boardId"
            name="boardId"
          />
          <FormInput
            ref={inputRef}
            id="title"
            placeholder="Enter list title..."
            onBlur={() => {}}
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-full font-medium border-transparent"
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default ListHeader;
