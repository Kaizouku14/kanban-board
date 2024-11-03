import { db, eq } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { hashPassword, verifyPassword } from "@/lib/utils";
import { TRPCError } from "@trpc/server";

type userInfo = {
  userId?: string;
  username: string;
  email: string;
  password?: string;
  newPassword?: string;
};
export const udpateUserInfo = async ({ ...data }: userInfo) => {
  const { userId, username, email, password, newPassword } = data;

  const [userFound] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId!))
    .limit(1)
    .execute();

  if (!userFound) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Account not found`,
    });
  }

  if ((password && !newPassword) || (!password && newPassword)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Both current password and new password must be provided, or neither.`,
    });
  }

  if (!password && !newPassword) {
    return await db
      .update(users)
      .set({ username, email })
      .where(eq(users.id, userId!))
      .execute();
  }

  if(newPassword!.length < 6){
    throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Password must at least 6 catcharacters long.`,
      });
  }

  const isPasswordValid = await verifyPassword(
    newPassword!,
    userFound.password
  );
  if (!isPasswordValid) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Invalid current password`,
    });
  }

  const newHashesPassword = await hashPassword(newPassword!);
  await db
    .update(users)
    .set({ password: newHashesPassword })
    .where(eq(users.id, userId!))
    .execute();
};
