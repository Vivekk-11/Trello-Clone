import { Board } from "@prisma/client";
import React from "react";
import BoardTitleForm from "./BoardTitleForm";
import BoardOptions from "./BoardOptions";

interface BoardNavbarProps {
  board: Board;
}

const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div
      className="h-14 w-full bg-black/50 z-[40] fixed top-14 flex items-center gap-x-4 px-6 text-white
  "
    >
      <BoardTitleForm board={board} />
      <div className="ml-auto">
        <BoardOptions id={board.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
