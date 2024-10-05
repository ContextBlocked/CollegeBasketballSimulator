// @flow
import * as React from 'react';
import {createGameDayPlayer} from "../../../util/core/functions/players/createGameDayPlayer";
import {IPlayer} from "../../../util/core/functions/players/generatePlayer";
import {ITeam} from "../../../util/core/data/playstyles";
import {GameSim, statType} from "../../../util/core/simulation/run";
import {useState} from "react";
import {PlayByPlayLogger} from "../../../util/core/simulation/playByPlay/playByPlayLogger";
import {Box, Grid} from "@mui/system";
import {Button, Grow} from "@mui/material";
import {createITeam} from "../../../util/core/functions/teams/createITeam";
import PlayByPlay from "~/components/md/playByPlay";
import {Scoreboard} from "~/components/md/scoreboard";

type Props = {

};

function translateRosterToGameDayPlayer(roster: IPlayer[]) {
    return createGameDayPlayer(roster)

}
function createTeam(team: ITeam) {
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
    return {
        id: team.id,
        pace: 1,
        players: translateRosterToGameDayPlayer(team.roster),
        playstyle: team.playstyle,
        stats: initialStats
    }
}

export default function GameSimulation(props: Props) {
    const [points, setPoints] = useState([0,0])
    const [spoiler , setSpoiler] = useState(false)
    const [transition , setTransition] = useState(false)
    const speedchannel = new BroadcastChannel("speed")
    const [flavorTeams, setFlavorTeams] = useState([createITeam('Sixers', 1), createITeam('Lakers', 2)])

    let simTeam1 = createTeam(flavorTeams[0])
    let simTeam2 = createTeam(flavorTeams[1])

    const [pbp, setPbp] = useState<PlayByPlayLogger>()
    const [postGameTeams, setPostGameTeams] = useState([simTeam1, simTeam2])
    const [playersOnCourt, setPlayersOnCourt] = useState([[], []])

    const game = new GameSim({
        gid: 1,
        teams: [simTeam1, simTeam2 ],
        pbpLog: new PlayByPlayLogger([simTeam1, simTeam2], [flavorTeams[0], flavorTeams[1]])
    })

    function run() {
        game.run()
        setPoints([game.teams[0]?.stats.point, game.teams[1]?.stats.point])
        setPbp(game.playByPlay)
        setTransition(true)
        // @ts-ignore
        setPostGameTeams(game.teams)
        // @ts-ignore
        setPlayersOnCourt(game.playersOnCourt)
    }

    let worker: Worker

    return (
        <Grid size={12} justifyItems={'center'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Button sx={{marginTop: 5}} fullWidth onClick={run}>Play Game</Button>
            <Grow in={transition} >
                <div>
                    <PlayByPlay log={pbp} teams={postGameTeams} flavorTeams={[flavorTeams[0], flavorTeams[1]]} playersonCourt={playersOnCourt}/>
                </div>
                </Grow>
        </Grid>
    );
};