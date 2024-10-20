// @flow
import * as React from 'react';
import {createGameDayPlayer} from "../../../util/core/functions/players/createGameDayPlayer";
import {IPlayer} from "../../../util/core/functions/players/generatePlayer";
import {ITeam} from "../../../public/playstyles";
import {GameSim, statType} from "../../../util/core/simulation/run";
import {useRef, useState} from "react";
import {PlayByPlayLogger} from "../../../util/core/simulation/playByPlay/playByPlayLogger";
import {Box, Grid} from "@mui/system";
import {Button, Grow} from "@mui/material";
import {generateITeam} from "../../../util/core/functions/teams/generateITeam";
import PlayByPlay from "~/components/md/playByPlay";
import {Scoreboard} from "~/.client/scoreboard";
import { motion, useAnimate } from "framer-motion"
import {GameWindow} from "~/.client/gameWindow";
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
    const [flavorTeams, setFlavorTeams] = useState([generateITeam('Sixers', 1), generateITeam('Lakers', 2)])

    let simTeam1 = createTeam(flavorTeams[0])
    let simTeam2 = createTeam(flavorTeams[1])

    const [pbp, setPbp] = useState<PlayByPlayLogger>()
    const [postGameTeams, setPostGameTeams] = useState([simTeam1, simTeam2])
    const [playersOnCourt, setPlayersOnCourt] = useState([[], []])
    const gameWindowRef = useRef(null)
    const game = new GameSim({
        gid: 1,
        teams: [simTeam1, simTeam2 ],
        pbpLog: new PlayByPlayLogger([simTeam1, simTeam2], [flavorTeams[0], flavorTeams[1]])
    })

    const [gamewindow, setGamewindow] = useState<boolean>()
    function run() {
        game.run()
        setPoints([game.teams[0]?.stats.point, game.teams[1]?.stats.point])
        setPbp(game.playByPlay)
        setTransition(true)
        // @ts-ignore
        setPostGameTeams(game.teams)
        // @ts-ignore
        setPlayersOnCourt(game.playersOnCourt)
        // @ts-ignore
        gameWindowRef.current.scrollIntoView({ behavior: 'smooth' })
        setGamewindow(true)
    }

    let worker: Worker


    return (
        <Grid size={12} justifyItems={'center'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
            <Button disableRipple sx={{marginTop: 5}} fullWidth onClick={run}>Play Game</Button>
            {gamewindow ? <GameWindow pbp={pbp} postGameTeams={postGameTeams} flavorTeams={[flavorTeams[0], flavorTeams[1]]} playersOnCourt={playersOnCourt}/>
                : <Box sx={{ height: 500, paddingTop: 300}} ref={gameWindowRef}></Box>}
        </Grid>
    );
};