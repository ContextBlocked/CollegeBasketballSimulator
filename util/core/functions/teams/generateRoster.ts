
import {toString} from "mdast-util-to-string";
import {Position, Positions} from "../../data/positions";
import {getRandom} from "../../numbers";
import {generatePlayer, IPlayer} from "../players/generatePlayer";
import {generateRandomHuman} from "../players/generateHuman";

interface props {
    minPlayers?: number,
    maxPlayers?: number,
    teamOverall?: number,
    teamPosition?: Position,
    teamAge?: number,
    teamHeight?: number,
    teamWeight?: number,
    teamExperience?: number,
}


export function generateRoster(props: props) {
    if (!props.minPlayers) props.minPlayers = 10
    if (!props.maxPlayers) props.maxPlayers = 15
    let amountOfPlayers = getRandom(props.minPlayers, props.maxPlayers);
    const extras = amountOfPlayers % 10
    const players: IPlayer[] = []
    for (let i = 0; i < 10; i++) {

        let position = Positions[i % 5]
        let player = generatePlayer(generateRandomHuman({position: position}), {position: position})

        players.push(player)
    }
    for (let i = 0; i < extras; i++) {
        let position = Positions[Math.floor(Math.random() * 5)]
        let player = generatePlayer(generateRandomHuman({position: position}), {position: position})
        players.push(player)
    }
    players.sort((a, b) => {
        if (a.position.id === b.position.id) {
            return b.ratings.Overall - a.ratings.Overall;
        }
        return a.position.id - b.position.id;
    });
    return players
}