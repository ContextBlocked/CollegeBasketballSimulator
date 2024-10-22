/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import React, {createContext, startTransition, StrictMode} from "react";
import { hydrateRoot } from "react-dom/client";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./mui/theme";
import createEmotionCache from "~/createEmotionCache";
import {ClientStyleContext} from "~/ClientStyleContext";
import {CacheProvider} from "@emotion/react";
import {pbpWorker} from "~/reducers/pbpReducer/definepbp";
import createCache from "@emotion/cache";
import {MuiProvider} from "~/mui/MuiProvider";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
            <ThemeProvider theme={theme}>

                <pbpWorker.Provider value={new Worker(new URL('../public/pbpWorker.ts', import.meta.url))}>
                   <MuiProvider>
                    <RemixBrowser/>
                   </MuiProvider>
                </pbpWorker.Provider>
            </ThemeProvider>

    </StrictMode>
);
});
