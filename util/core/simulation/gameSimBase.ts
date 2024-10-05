import {simSettings} from "../../settings/simSettings";

export class GameSimBase {
    id: number;
    overtime = false
    overtimes = 0
    maxOvertimes = simSettings.maxOvertimes
    constructor({gid}:{gid:number}) {
        this.id = gid
    }
}