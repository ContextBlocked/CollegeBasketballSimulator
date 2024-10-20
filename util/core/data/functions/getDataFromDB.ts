import {db} from "../db";
import {EntityTable} from "dexie";

export function getDataFromDB(table?: "teams" | "undefined") {
   switch (table) {
         case "teams":
              return db.Teams.toArray()
         default:
             return db.Teams.toArray()
   }
}