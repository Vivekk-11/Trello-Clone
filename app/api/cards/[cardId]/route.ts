import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { cardId: string } }
) => {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return NextResponse.json("Unauthorized!", { status: 401 });
    }

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });
    return NextResponse.json(card);
  } catch (error) {
    return NextResponse.json("Internal Error", { status: 500 });
  }
};
