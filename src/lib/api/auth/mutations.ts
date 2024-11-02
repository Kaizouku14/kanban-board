import { lucia } from "@/lib/auth/lucia";
import { db, eq } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { hashPassword, verifyPassword } from "@/lib/utils";
import { TRPCError } from "@trpc/server";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

interface User {
  username: string;
  email: string;
  password: string;
}

export const signupUser = async ({ ...params }: User) => {
  const { username, email, password } = params;

  const [userFound] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .execute();

  if (userFound) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Email already in use!`,
    });
  }

  const hashedPassword = await hashPassword(password);
  const userId = generateIdFromEntropySize(16);

  await db.insert(users).values({
    id: userId,
    username,
    email,
    password: hashedPassword,
  });
};

export const signinUser = async ({ ...params }) => {
  const { email, password } = params;

  const [userFound] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .execute();

  if (!userFound) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Invalid email, please try again.",
    });
  }


  const passwordMatched = await verifyPassword(userFound.password, password);

  if (!passwordMatched) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Incorrect password, please try again.",
    });
  }

  const session = await lucia.createSession(userFound.id, {});

  const sessionCookies = lucia.createSessionCookie(session.id);
  cookies().set(lucia.sessionCookieName, sessionCookies.value, {
    ...sessionCookies.attributes,
  });
};
