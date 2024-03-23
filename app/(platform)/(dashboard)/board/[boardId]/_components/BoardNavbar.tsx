import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Board } from "@prisma/client";
import React from "react";
import BoardTitleForm from "./BoardTitleForm";

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
    </div>
  );
};

export default BoardNavbar;
