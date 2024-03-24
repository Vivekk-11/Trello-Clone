"use client";

import { ListWithCards } from "@/types";
import React, { useEffect, useState } from "react";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { Droppable, DragDropContext } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

const ListContainer = ({ lists }: ListContainerProps) => {
  const [orderedList, setOrderedList] = useState(lists);
  const params = useParams();
  const boardId: string = params.boardId! as string;
  const { execute } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedList(lists);
  }, [lists]);

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination || !source) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //  User moves a list
    if (type === "list") {
      const items = reorder(orderedList, source.index, destination.index).map(
        (item, index) => {
          return { ...item, order: index };
        }
      );
      setOrderedList(items);
      execute({ items, boardId });
    }

    //  User moves a card
    if (type === "card") {
      const newOrderedData = [...orderedList];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;

      // Check if cards exist on source list
      if (!sourceList.card) {
        sourceList.card = [];
      }

      // Check if cards exist on destination list
      if (!destinationList.card) {
        destinationList.card = [];
      }

      // Moving the cards in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.card,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.card = reorderedCards;

        setOrderedList(newOrderedData);
      } else {
        // Remove card from the source list

        const [movedCard] = sourceList.card.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        // Add card to the destination list
        destinationList.card.splice(destination.index, 0, movedCard);

        // update the order for each card in source list
        sourceList.card.forEach((c, index) => {
          c.order = index;
        });

        // update the order for each card in destination list
        destinationList.card.forEach((c, index) => {
          c.order = index;
        });

        setOrderedList(newOrderedData);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" direction="horizontal" type="list">
        {(provided) => (
          <ol
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-x-3 h-full"
          >
            {orderedList.map((list, index) => {
              return <ListItem index={index} key={list.id} list={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0"></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
