import { adapter } from "../db/schema/users";
import { Lucia, type Session, type User } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // Set the secure attribute for the session cookie if in production
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        // Return the user attributes as they are
        return {
            ...attributes
        };
    }
});

export const getSession = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    // Retrieve the session ID from the cookies
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    // If no session ID is found, return null for both user and session
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    // Validate the session using the session ID
    const result = await lucia.validateSession(sessionId);

    try {
      // If the session is still fresh (valid), create a new session cookie
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }

      // If the session is not valid, create a blank session cookie
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch (err) {
      // Log any errors that occur during session handling
      console.log(err);
    }

    // Return the result containing user and session information
    return result;
  }
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  email: string;
}
