import { appRouter, createTRPCContext } from '@/server/root';
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
  });
}

export { handler as GET, handler as POST };