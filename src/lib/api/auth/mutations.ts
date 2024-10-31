import { lucia } from "@/lib/auth/lucia";
import dbConnection from "@/lib/db/dg-config";
import { User }from "@/lib/db/schema/users";
import { hashPassword, verifyPassword } from "@/lib/utils";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

interface ISignup {
  username: string;
  email: string;
  password: string;
}

export const signupUser = async ({ ...params }: ISignup) => {
  const { username, email, password } = params;

  dbConnection();

  const userFound = await User.findOne({ email });
  if (userFound) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Email already in use!`,
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
};

export const signinUser = async ({ ...params }) => {
  dbConnection();

  const { email, password } = params;

  const userFound = await User.findOne({ email });
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

  const session = lucia.createSession(userFound.id, {});
  const sessionCookies = lucia.createSessionCookie((await session).id);
  cookies().set(lucia.sessionCookieName, sessionCookies.value, {
    ...sessionCookies.attributes,
  });

};
