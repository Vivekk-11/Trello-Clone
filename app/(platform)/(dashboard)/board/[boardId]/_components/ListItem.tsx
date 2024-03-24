"use client";

import { ListWithCards } from "@/types";
import React from "react";
import ListHeader from "./ListHeader";

interface ListItemProps {
  index: number;
  list: ListWithCards;
}

const ListItem = ({ index, list }: ListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md shadow-md pb-2 bg-[#f1f2f4]">
        <ListHeader list={list} />
      </div>
    </li>
  );
};

export default ListItem;
