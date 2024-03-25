import { auth, currentUser } from "@clerk/nextjs";
import { ENTITY_TYPE, ACTION } from "@prisma/client";
import { db } from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    const { entityId, entityType, entityTitle, action } = props;

    await db.auditLog.create({
      data: {
        orgId,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
        entityId,
        entityType,
        entityTitle,
        action,
      },
    });
  } catch (error) {
    console.log("[Audit Log Error]", error);
  }
};
