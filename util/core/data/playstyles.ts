import {IPlayer} from "../functions/players/generatePlayer";

export type teamOffensePlaystyle = "Balanced" | "Outside" | "Inside" | "Star" | "Motion"
export type teamDefensePlaystyle = "Man2Man" | "Outside" | "Inside" | "Star" | "noGuards"
export type offPlaystyle = {
    strengths: teamDefensePlaystyle[] | undefined,
    average: teamDefensePlaystyle[] | undefined,
    weaknesses: teamDefensePlaystyle[] | undefined,
    rebounding: number
}
export type defPlaystyle = {
    strengths: teamOffensePlaystyle[],
    average: teamOffensePlaystyle[],
    weaknesses: teamOffensePlaystyle[],
    rebounding: number
}

export const offBalanced: offPlaystyle = {
    strengths: undefined,
    average: ["Outside", "Inside", "Star", "noGuards"],
    weaknesses: ["Man2Man"],
    rebounding: .3,
}
export const offOutside: offPlaystyle = {
    strengths: ["Inside"],
    average: ["Star"],
    weaknesses: ["Man2Man", "noGuards", "Outside"],
    rebounding: .1
}
export const offInside: offPlaystyle = {
    strengths: ["Outside"],
    average: [ "Man2Man", "noGuards"],
    weaknesses: ["Inside", "Star"],
    rebounding: .5,
}
export const offStar: offPlaystyle = {
    strengths: ["Man2Man"],
    average: ["Outside", "Inside", "noGuards"],
    weaknesses: ["Star"],
    rebounding: .4
}
export const offMotion: offPlaystyle = {
    strengths: ["Outside", "noGuards", "Star"],
    average: undefined,
    weaknesses: ["Man2Man", "Inside"],
    rebounding: .2
}

export type ITeam = {
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