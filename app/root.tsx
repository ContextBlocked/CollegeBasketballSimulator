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
import theme from "./mui/theme";
import 'remixicon/fonts/remixicon.css'
import {useContext, useEffect, useLayoutEffect} from "react";
import '././assets/button.css'
import {ManifestLink, sendSkipWaitingMessage, useSWEffect} from "@remix-pwa/sw";
import {usePWAManager} from "@remix-pwa/client";
import {withEmotionCache} from "@emotion/react";
import {ClientStyleContext} from "~/ClientStyleContext";
import useEnhancedEffect from "@mui/utils/useEnhancedEffect";
import {ClientOnly} from 'remix-utils/client-only'
import {createPortal} from "react-dom";
import createCache from "@emotion/cache";
import {MuiMeta} from "~/mui/MuiMeta";
import {getMuiLinks} from "~/mui/getMuiLinks";
import {MuiDocument} from "~/mui/MuiDocument";

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}
export const links: LinksFunction = () => [...getMuiLinks()];

//https://github.com/mahmoudmoravej/remix-mui/tree/main
export function Head() {
  return (
      <head>

        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Meta/>
        <ManifestLink/>
        <Links />
      </head>
  )
}



export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <Head/>
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
}

export default function App() {

  const {swUpdate} = usePWAManager()
  const revalidator = useRevalidator()
  useEffect(() => {
    revalidator.revalidate()
  }, []);
  return (
      <MuiDocument>
        <Outlet />
    {swUpdate.isUpdateAvailable && (
        <div className='bg-background text-foreground fixed bottom-6 right-6'>
          <p>Update available</p>
          <button onClick={() => {
            sendSkipWaitingMessage(swUpdate.newWorker!)
            window.location.reload()
          }}>Reload</button>
        </div>
    )}
  </MuiDocument>
  );
}
