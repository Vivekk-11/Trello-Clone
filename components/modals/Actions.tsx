"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import { CardWithList } from "@/types";
import { Button } from "../ui/button";
import { Copy, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
  card: CardWithList;
}

const Actions = ({ card }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isDeleteCardLoading } =
    useAction(copyCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied!`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  const { execute: executeDeleteCard, isLoading: isCopyCardLoading } =
    useAction(deleteCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted!`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  const onCopy = () => {
    executeCopyCard({
      id: card?.id! as string,
      boardId: params.boardId! as string,
    });
  };

  const onDelete = () => {
    executeDeleteCard({
      id: card?.id! as string,
      boardId: params.boardId! as string,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        disabled={isCopyCardLoading}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isDeleteCardLoading}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

export default Actions;

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
