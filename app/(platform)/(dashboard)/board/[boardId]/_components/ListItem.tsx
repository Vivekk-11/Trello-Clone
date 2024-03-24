"use client";

import { ListWithCards } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "./ListHeader";
import CardForm from "./CardForm";

interface ListItemProps {
  index: number;
  list: ListWithCards;
}

const ListItem = ({ index, list }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md shadow-md pb-2 bg-[#f1f2f4]">
        <ListHeader onAddCard={enableEditing} list={list} />
        <CardForm
          listId={list.id}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          ref={textareaRef}
          isEditing={isEditing}
        />
      </div>
    </li>
  );
};

export default ListItem;
