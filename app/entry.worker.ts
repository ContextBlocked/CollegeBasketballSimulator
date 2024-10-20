/// <reference lib="WebWorker" />

declare let self: ServiceWorkerGlobalScope;
import {
    clearUpOldCaches,
    DefaultFetchHandler,
    EnhancedCache,
    isDocumentRequest,
    isLoaderRequest,
    NavigationHandler, WorkerLoadContext
} from "@remix-pwa/sw";
import {db} from "../util/core/data/db";
import Dexie, {EntityTable} from "dexie";
import {IPlayer} from "../util/core/functions/players/generatePlayer";
export {};

const version = 'v3'



const dataCacheName = 'data-cache'
const documentCacheName = 'document-cache'
const assetCacheName = 'asset-cache'
const dataCache = new EnhancedCache(dataCacheName, {
  version: version,
  strategy: 'CacheFirst',
  strategyOptions: {}
})
const documentCache = new EnhancedCache(documentCacheName, {
    version: version,
    strategy: 'NetworkFirst',
    strategyOptions: {}
    })
const assetCache = new EnhancedCache(assetCacheName, {
    version: version,
    strategy: 'CacheFirst',
    strategyOptions: {}
})

export type WorkerContext = ReturnType<typeof getLoadContext> & WorkerLoadContext
export type teamOffensePlaystyle = "Balanced" | "Outside" | "Inside" | "Star" | "Motion"
export type teamDefensePlaystyle = "Man2Man" | "Outside" | "Inside" | "Star" | "noGuards"
 type offPlaystyle = {
    strengths: teamDefensePlaystyle[] | undefined,
    average: teamDefensePlaystyle[] | undefined,
    weaknesses: teamDefensePlaystyle[] | undefined,
    rebounding: number
}
 type defPlaystyle = {
    strengths: teamOffensePlaystyle[],
    average: teamOffensePlaystyle[],
    weaknesses: teamOffensePlaystyle[],
    rebounding: number
}
type ITeam = {
    id: number;
    name: string;
    hometown: string;
    primaryColor: string;
    secondaryColor: string;
    playstyle: {
        defense: teamDefensePlaystyle;
        offense: offPlaystyle;
    }
    roster: IPlayer[]
}
export type workerOffPlaystyle = {
    strengths: teamDefensePlaystyle[] | undefined,
    average: teamDefensePlaystyle[] | undefined,
    weaknesses: teamDefensePlaystyle[] | undefined,
    rebounding: number
}
export const workerOffInside: offPlaystyle = {
    strengths: ["Outside"],
    average: [ "Man2Man", "noGuards"],
    weaknesses: ["Inside", "Star"],
    rebounding: .5,
}


export const getLoadContext = () => {
    async function getCount(){
        try {
            const count = await db.Teams.count().then((count) => {
                return count
            }).then((count) => {
                return count
            })
            return count
        }
        catch (e) {
            console.error(e)
        }
    }
    return {
        getCount: async () => getCount(),
        database: db as { Teams: EntityTable<ITeam, 'id'> },
        caches: [dataCache, documentCache, assetCache],
    }
}

export const defaultFetchHandler: DefaultFetchHandler = async ({context}: any) => {
    const request = context.event.request;
    console.log(context);
    const url = new URL(request.url)

    if (self.__workerManifest.assets.includes(url.pathname)) {
        return assetCache.handleRequest(request)
    }
    if (isDocumentRequest(request)) {
        return documentCache.handleRequest(request)
    }
    if (isLoaderRequest(request)) {
        return dataCache.handleRequest(request);
    }
  return fetch(request)
}


self.addEventListener('install', event => {
  console.log('Service worker installed');

  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('Service worker activated');

  event.waitUntil(Promise.all(([
      clearUpOldCaches([documentCacheName,dataCacheName,assetCacheName], version),
      self.clients.claim()
  ])));
});
const messageHandler = new NavigationHandler({
    cache: documentCache
})

self.addEventListener('message', (event: ExtendableMessageEvent) => {
    event.waitUntil(messageHandler.handleMessage(event))
})
