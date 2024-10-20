import {Position} from "./positions";
import {IHuman} from "../../functions/players/generateHuman";
import {calculateHeightRating, calculateWeightRating, getBoostRange, getRandom} from "../../numbers";

export interface IPhysicalRatings {
    Height: number;
    Weight: number;
    Speed: number;
    Jump: number;
}
export interface IScoringRatings {
    Inside: number;
    Mid: number;
    Outside: number;
    FT: number;
}
export interface ISkillRatings {
    Passing: number;
    Handling: number;
    Defense: number;
    Offense: number;
    Rebounding: number;

}
export interface IRatings {
PhysicalRatings: IPhysicalRatings;
ScoringRatings: IScoringRatings;
SkillRatings: ISkillRatings;
Overall: number
}
const ratingsSettings = {
    //human stats have direct impact on ratings
    //higher heights = better rebounding and inside scoring (optimally)
}

export function getPhysicalRatings(human: IHuman, position: Position): IPhysicalRatings {

    const height = human.height;
    const weight = human.weight;
    const boost = getBoostRange(weight)
    return {
        Height: calculateHeightRating(height, position),
        Weight: calculateWeightRating(weight, position),
        Speed: getRandom(),
        Jump: getRandom(),
    };
}
export function getScoringRatings(human: IHuman, position: Position): IScoringRatings {
    return {
        Inside: getRandom(60,100),
        Mid: getRandom(60,100),
        Outside: getRandom(60,100),
        FT: getRandom(60,100),
    };
}
export function getSkillRatings(human: IHuman, position: Position): ISkillRatings {
    return {
        Passing: getRandom(60,100),
        Handling: getRandom(60,100),
        Defense: getRandom(60,100),
        Offense: getRandom(60,100),
        Rebounding: getRandom(60,100),
    };
}

export function generateRatings(human: IHuman) {

}
export function getOverall(human: IHuman, position: Position): number {
    const physicalRatings = getPhysicalRatings(human, position);
    const scoringRatings = getScoringRatings(human, position);
    const skillRatings = getSkillRatings(human, position);

    const allRatings = [
        physicalRatings.Speed,
        physicalRatings.Jump,
        ...Object.values(scoringRatings),
        ...Object.values(skillRatings)
    ];

    const totalRating = allRatings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / allRatings.length;

    return averageRating;
}