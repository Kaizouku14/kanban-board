import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from 'bcryptjs' 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPassword = async (plainPassword: string): Promise<string> => {
  try {
    const saltRounds = process.env.SALT_ROUNDS!;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error: unknown) {
    console.log((error as Error).message);
    throw new Error("Error hashing password");
  }
};

export const verifyPassword = async (
  storedHashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, storedHashedPassword);
    return isMatch;
  } catch (error: unknown) {
    console.log((error as Error).message);
    throw new Error("Error verifying password");
  }
};
