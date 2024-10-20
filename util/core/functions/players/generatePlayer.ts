
import {generateRandomHuman, IHuman} from "./generateHuman";
import {getRandomPossiblePosition, Position} from "../../data/defined/positions";
import {getOverall, getPhysicalRatings, getScoringRatings, getSkillRatings, IRatings} from "../../data/defined/ratings";

interface props {
    Overall?: number,
    position?: Position,
}
export interface IPlayer {
    human: IHuman;
    position: Position;
    ratings: IRatings
}

export function generatePlayer(human?: IHuman, props?: props) {
    if (!human) human = generateRandomHuman({position: props?.position || undefined})
    //console.log(human)
    const position = props?.position ?? getRandomPossiblePosition(human)
    return {
        human: human,
        position: position,
        ratings: {
            PhysicalRatings: getPhysicalRatings(human, position),
            ScoringRatings: getScoringRatings(human, position),
            SkillRatings: getSkillRatings(human, position),
            Overall: getOverall(human, position)
        },
    }

}