"use client";

import { CardWithList } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { AlignLeft } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams } from "next/navigation";
import FormTextarea from "../form/FormTextarea";
import { Button } from "../ui/button";
import FormSubmit from "../form/FormSubmit";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface DescriptionProps {
  card: CardWithList;
}

const Description = ({ card }: DescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const params = useParams();
  const queryClient = useQueryClient();
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card "${data.title}" updated!`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description")! as string;
    const boardId = params.boardId! as string;

    execute({ description, boardId, id: card.id });
  };

  return (
    <div className="w-full gap-x-3 flex items-start">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} className="space-y-2" ref={formRef}>
            <FormTextarea
              id="description"
              className="w-full mt-2"
              placeholder="Add a more detailed description"
              defaultValue={card.description || undefined}
              errors={fieldErrors}
              ref={textareaRef}
            />
            <div className="flex items-center-gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                onClick={disableEditing}
                type="button"
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {card?.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start w-full gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-6 mb-2 bg-neutral-200" />
        <Skeleton className="bg-neutral-200 w-full h-[78px]" />
      </div>
    </div>
  );
};
