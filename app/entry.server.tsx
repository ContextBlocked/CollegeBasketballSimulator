/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import ReactDOMServer, { renderToReadableStream } from "react-dom/server";
import createEmotionCache from "~/createEmotionCache";
import createEmotionServer from "@emotion/server/create-instance";
import {CacheProvider} from "@emotion/react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../public/mui/theme";
import React from "react";

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
  const cache = createEmotionCache()
  const {extractCriticalToChunks} = createEmotionServer(cache)

  function MuiRemixServer() {
    return (
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RemixServer context={remixContext} url={request.url}/>
          </ThemeProvider>
        </CacheProvider>
    )
  }
  const html = ReactDOMServer.renderToString(<MuiRemixServer/>)

    const { styles } = extractCriticalToChunks(html)
    let stylesHTML = '';

    styles.forEach(({ key, ids, css }) => {
        const emotionKey = `${key} ${ids.join(' ')}`;
        const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
        stylesHTML = `${stylesHTML}${newStyleTag}`;
    });

    // Add the Emotion style tags after the insertion point meta tag
    const markup = html.replace(
        /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
        `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`,
    );

  const body = await renderToReadableStream(
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <RemixServer context={remixContext} url={request.url}/>
        </ThemeProvider>
      </CacheProvider>,
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
    return new Response(`<!DOCTYPE html>${markup}`, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}
