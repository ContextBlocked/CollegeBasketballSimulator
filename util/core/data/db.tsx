import Dexie, {EntityTable} from "dexie";
import {ITeam} from "../../../public/playstyles";
const db = new Dexie('local') as Dexie  & {
    Teams: EntityTable<
        ITeam,
        'id'
    >,

}


db.version(1).stores({
    Teams: '++id',
})
export {db}