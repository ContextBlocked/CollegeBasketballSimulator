
import {positionSettings} from "../../../settings/positionSettings";
import {IHuman} from "../../functions/players/generateHuman";
import {getRandom} from "../../numbers";

type PGarchetypes  = "Playmaker" | "Sharpshooter" | "Combo Guard";
export interface Position {
    id: number
    name: string;
    abbreviation: string;
    minHeight: number;
    maxHeight: number;
    minWeight: number;
    maxWeight: number;
}



export function getPossiblePositions(height: number) {
    const possiblePositions = []
    //1 = point guard 2 = shooting guard 3 = small forward 4 = power forward 5 = center
    if (height >= pointGuard.minHeight && height <= pointGuard.maxHeight) possiblePositions.push(pointGuard)
    if (height >= shootingGuard.minHeight && height <= shootingGuard.maxHeight) possiblePositions.push(shootingGuard)
    if (height >= smallForward.minHeight && height <= smallForward.maxHeight) possiblePositions.push(smallForward)
    if (height >= powerForward.minHeight && height <= powerForward.maxHeight) possiblePositions.push(powerForward)
    if (height >= center.minHeight && height <= center.maxHeight) possiblePositions.push(center)
    return possiblePositions
}

export function getRandomPossiblePosition(human: IHuman) {
    const possiblePositions = getPossiblePositions(human.height)
    //console.log(possiblePositions)
    const medians = Array<number>()
    possiblePositions.forEach((position) => {
        medians.push(position.maxHeight - position.minHeight)
    })
    const weightedArray = Array<Position>()
    const closest = medians.reduce((prev, curr) => Math.abs(curr - human.height) < Math.abs(prev - human.height) ? curr : prev)
    const favoredPosition = possiblePositions[medians.indexOf(closest)]
    for (const possiblePosition of possiblePositions) {
        if (possiblePosition === favoredPosition) {
            for (let i = 0; i < possiblePositions.length; i++) {
                weightedArray.push(possiblePosition)
            }
        } else {
            weightedArray.push(possiblePosition)
        }
    }
    const position = getRandom(0, weightedArray.length)
    return weightedArray[position - 1]
}

export const pointGuard: Position = {
    id: 1,
    name: "Point Guard",
    abbreviation: "PG",
    minHeight: positionSettings.PG_MIN_HEIGHT,
    maxHeight: positionSettings.PG_MAX_HEIGHT,
    minWeight: positionSettings.PG_MIN_WEIGHT,
    maxWeight: positionSettings.PG_MAX_WEIGHT,
}
export const shootingGuard: Position = {
    id: 2,
    name: "Shooting Guard",
    abbreviation: "SG",
    minHeight: positionSettings.SG_MIN_HEIGHT,
    maxHeight: positionSettings.SG_MAX_HEIGHT,
    minWeight: positionSettings.SG_MIN_WEIGHT,
    maxWeight: positionSettings.SG_MAX_WEIGHT,
}
export const smallForward: Position = {
    id: 3,
    name: "Small Forward",
    abbreviation: "SF",
    minHeight: positionSettings.SF_MIN_HEIGHT,
    maxHeight: positionSettings.SF_MAX_HEIGHT,
    minWeight: positionSettings.SF_MIN_WEIGHT,
    maxWeight: positionSettings.SF_MAX_WEIGHT,

}
export const powerForward: Position = {
    id: 4,
    name: "Power Forward",
    abbreviation: "PF",
    minHeight: positionSettings.PF_MIN_HEIGHT,
    maxHeight: positionSettings.PF_MAX_HEIGHT,
    minWeight: positionSettings.PF_MIN_WEIGHT,
    maxWeight: positionSettings.PF_MAX_WEIGHT,
}
export const center: Position = {
    id: 5,
    name: "Center",
    abbreviation: "C",
    minHeight: positionSettings.C_MIN_HEIGHT,
    maxHeight: positionSettings.C_MAX_HEIGHT,
    minWeight: positionSettings.C_MIN_WEIGHT,
    maxWeight: positionSettings.C_MAX_WEIGHT,
}

export const Positions = [pointGuard, shootingGuard, smallForward, powerForward, center]
