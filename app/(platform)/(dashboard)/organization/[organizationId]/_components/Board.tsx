import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import React from "react";
import DeleteButton from "./DeleteButton";

interface BoardProps {
  id: string;
  title: string;
}

const Board = async ({ id, title }: BoardProps) => {
  return (
    <form
      action={deleteBoard.bind(null, id)}
      className="flex items-center gap-x-2"
    >
      <p>Board title: {title}</p>
      <DeleteButton />
    </form>
  );
};

export default Board;
