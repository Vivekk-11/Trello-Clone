import { db } from "@/lib/db";
import React from "react";
import Board from "./_components/Board";
import Form from "./_components/Form";

const OrganizationPage = async () => {
  const boards = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="space-y-2">
        {boards.map(({ id, title }) => (
          <Board key={id} title={title} id={id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;
