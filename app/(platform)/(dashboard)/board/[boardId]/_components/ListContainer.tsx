import { ListWithCards } from "@/types";
import React from "react";
import ListForm from "./ListForm";

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="w-1 flex-shrink-0"></div>
    </ol>
  );
};

export default ListContainer;
