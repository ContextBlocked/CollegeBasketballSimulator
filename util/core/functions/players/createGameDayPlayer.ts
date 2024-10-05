import {GameDayPlayer, statType} from "../../simulation/run";
import {IPlayer} from "./generatePlayer";


export function createGameDayPlayer(players: IPlayer[]) {
    const playersIndex = Array<GameDayPlayer>()
    players.forEach((player, index) => {
        const initialStats: { [key in statType]: number } = {
            assist: 0,
            point: 0,
            block: 0,
            defReb: 0,
            offReb: 0,
            steal: 0,
            turnover: 0,
            foul: 0,
            foulsDrawn: 0,
            ftm: 0,
            fta: 0,
            fgm: 0,
            fga: 0,
            threePtM: 0,
            threePtA: 0,
            atRimFg: 0,
            atRimFgA: 0,
            postFg: 0,
            postFgA: 0,
            midRangeFg: 0,
            midRangeFgA: 0,
            putBackFg: 0,
            putBackFgA: 0,
            techFoul: 0,
            flagrantFoul: 0,
            defensiveFoul: 0,
            offensiveFoul: 0
        }
        const playerIndex: GameDayPlayer = {
            id: index,
            player: player,
            stamina: 100,
            stats: initialStats
        }
        playersIndex.push(playerIndex)
    })
    return playersIndex
}