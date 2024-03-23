import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import ListContainer from "./_components/ListContainer";

interface BoardIdPageProps {
  boardId: string;
}

const BoardIdPage = async ({ boardId }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect(`/select-org`);
  }

  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId,
      },
    },
    include: {
      card: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={boardId} lists={lists} />
    </div>
  );
};

export default BoardIdPage;
