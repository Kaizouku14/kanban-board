"use client";

import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { makeQueryClient } from "./query-client";
import { api } from "./client";
import superjson from "superjson";

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return makeQueryClient();
    }

    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
    const base = (() => {
        if (typeof window !== "undefined") return "";
        if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
        return "http://localhost:3000";
    })();
    return `${base}/api/trpc`;
}

export function TRPCProvider(
    props: Readonly<{
        children: React.ReactNode;
    }>
) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                httpBatchLink({
                    transformer: superjson,  //<-- if you use a data transformer
                    url: getUrl(),
                }),
            ],
        })
    );

    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </api.Provider>
    );
}