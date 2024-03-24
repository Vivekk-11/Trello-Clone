"use client";

import { ListWithCards } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "./ListHeader";
import CardForm from "./CardForm";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";

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
        <ol
          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            list.card?.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {list.card.map((c, index) => (
            <CardItem index={index} key={c.id} card={c} />
          ))}
        </ol>
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
