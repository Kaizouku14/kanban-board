import { createTRPCReact } from "@trpc/react-query";
import { appRouter } from '@/server/root';

export const api = createTRPCReact<appRouter>({});