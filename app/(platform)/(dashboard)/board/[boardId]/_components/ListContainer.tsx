"use client";

import { ListWithCards } from "@/types";
import React, { useEffect, useState } from "react";
import ListForm from "./ListForm";
import ListItem from "./ListItem";

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  const [orderedList, setOrderedList] = useState(lists);

  useEffect(() => {
    setOrderedList(lists);
  }, [lists]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedList.map((list, index) => {
        return <ListItem index={index} key={list.id} list={list} />;
      })}
      <ListForm />
      <div className="w-1 flex-shrink-0"></div>
    </ol>
  );
};

export default ListContainer;
