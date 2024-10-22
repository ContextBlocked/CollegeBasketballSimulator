/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import {defer, RemixServer} from "@remix-run/react";
import { isbot } from "isbot";
import ReactDOMServer, {renderToReadableStream, renderToString} from "react-dom/server";
import createEmotionCache from "~/createEmotionCache";
import createEmotionServer from "@emotion/server/create-instance";
import {CacheProvider} from "@emotion/react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./mui/theme";
import React from "react";
import createCache from "@emotion/cache";
import {Head} from "~/root";
import {MuiProvider} from "~/mui/MuiProvider";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {


  function MuiRemixServer() {
    return (
              <MuiProvider>
                  <RemixServer context={remixContext} url={request.url}/>
              </MuiProvider>
    )
  }

  const body = await renderToReadableStream(

          <RemixServer context={remixContext} url={request.url}/>,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
    return new Response(body, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}
