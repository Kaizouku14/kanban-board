import { ISignup } from "@/interface/ISignup";
import dbConnection from "@/lib/db/dg-config";
import CreateUser from "@/lib/db/schema/sign-up";
import { TRPCError } from "@trpc/server";

export const signupUser = async ({ ...props }: ISignup) => {
  const { username, email, password } = props;

    dbConnection();

    const userFound = await CreateUser.findOne({ email });
    if (userFound) {
        throw new TRPCError({
        code: "NOT_FOUND",
        message: `Email already in use!`,
        });
    }

    const newUser = new CreateUser({ username, email, password });
    await newUser.save();

    if (newUser) {
        console.log("User created successfully");
      } else {
        console.log("User creation failed");
      }
};
