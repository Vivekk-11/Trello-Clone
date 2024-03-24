"use client";
import { List } from "@prisma/client";
import React from "react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import FormSubmit from "@/components/form/FormSubmit";
import { Separator } from "@/components/ui/separator";

interface ListOptionsProps {
  onAddCard: () => void;
  list: List;
}

const ListOptions = ({ onAddCard, list }: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-auto h-auto p-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List Actions
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant="ghost"
          className="w-full h-auto rounded-none p-2 px-5 justify-start font-normal text-sm"
        >
          Add card...
        </Button>
        <form>
          <input type="hidden" value={list.id} id="id" name="id" />
          <input
            type="hidden"
            value={list.boardId}
            id="boardId"
            name="boardId"
          />
          <FormSubmit
            variant="ghost"
            className="w-full h-auto rounded-none p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form>
          <input type="hidden" value={list.id} id="id" name="id" />
          <input
            type="hidden"
            value={list.boardId}
            id="boardId"
            name="boardId"
          />
          <FormSubmit
            variant="ghost"
            className="w-full h-auto rounded-none p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
