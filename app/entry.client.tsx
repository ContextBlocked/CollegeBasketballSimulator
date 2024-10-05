/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import React, {createContext, startTransition, StrictMode} from "react";
import { hydrateRoot } from "react-dom/client";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../public/mui/theme";
import createEmotionCache from "~/createEmotionCache";
import ClientStyleContext from "~/ClientStyleContext";
import {CacheProvider} from "@emotion/react";
import {pbpWorker} from "~/reducers/pbpReducer/definepbp";

interface ClientCacheProviderProps {
    children: React.ReactNode;
}
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
    const [cache, setCache] = React.useState(createEmotionCache());

    const clientStyleContextValue = React.useMemo(
        () => ({
            reset() {
                setCache(createEmotionCache());
            },
        }),
        [],
    );

    return (
        <ClientStyleContext.Provider value={clientStyleContextValue}>
            <CacheProvider value={cache}>{children}</CacheProvider>
        </ClientStyleContext.Provider>
    );
}


startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
        <ClientCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <pbpWorker.Provider value={new Worker(new URL('../public/pbpWorker.ts', import.meta.url))}>
                    <RemixBrowser/>
                </pbpWorker.Provider>
            </ThemeProvider>
        </ClientCacheProvider>
    </StrictMode>
);
});
