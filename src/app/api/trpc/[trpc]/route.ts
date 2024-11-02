import { appRouter } from '@/server/root';
import { createTRPCContext } from '@/server/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

const createContext = async (req : NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
}

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
  });
}

export { handler as GET, handler as POST };