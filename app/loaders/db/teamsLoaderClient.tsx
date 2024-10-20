

import {ClientLoaderFunctionArgs} from "@remix-run/react";
import {getDataFromDB} from "../../../util/core/data/functions/getDataFromDB";




export const clientLoader = async ({
    request,
    params,
    serverLoader
}: ClientLoaderFunctionArgs)=> {

    return getDataFromDB()

}
clientLoader.hydrate = true