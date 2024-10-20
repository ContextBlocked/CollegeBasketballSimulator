import type { LinksFunction } from "@remix-run/cloudflare";
import {
  Links, LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useRevalidator,
} from "@remix-run/react";

import "./tailwind.css";
import {CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {Nav} from "~/components/lg/nav";
import theme from "../public/mui/theme";
import 'remixicon/fonts/remixicon.css'
import {useContext, useEffect, useLayoutEffect} from "react";
import '././assets/button.css'
import {ManifestLink, sendSkipWaitingMessage, useSWEffect} from "@remix-pwa/sw";
import {usePWAManager} from "@remix-pwa/client";
import {withEmotionCache} from "@emotion/react";
import {ClientStyleContext} from "~/ClientStyleContext";
import useEnhancedEffect from "@mui/utils/useEnhancedEffect";



interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const clientStyleData = useContext(ClientStyleContext);

  useLayoutEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <ManifestLink/>
      <Links/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
      />
    </head>
    <body>
    <ThemeProvider theme={theme}>
      <nav>
        <Nav/>
      </nav>{children}<ScrollRestoration/>
      <Scripts/>
    </ThemeProvider>
    </body>
    </html>
  );
})

export default function App() {

  const {swUpdate} = usePWAManager()
  const revalidator = useRevalidator()
  useEffect(() => {
    revalidator.revalidate()
  }, []);
  return (
      <Document><Outlet />
    {swUpdate.isUpdateAvailable && (
        <div className='bg-background text-foreground fixed bottom-6 right-6'>
          <p>Update available</p>
          <button onClick={() => {
            sendSkipWaitingMessage(swUpdate.newWorker!)
            window.location.reload()
          }}>Reload</button>
        </div>
    )}
  </Document>
  );
}
