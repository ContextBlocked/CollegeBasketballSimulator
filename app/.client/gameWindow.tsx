// @flow
import * as React from 'react';
import PlayByPlay from "~/components/md/playByPlay";
import {motion, useAnimate} from "framer-motion";
import {GameDayTeam} from "../../util/core/simulation/run";
import {PlayByPlayLogger} from "../../util/core/simulation/playByPlay";
import {ITeam} from "../../util/core/data/playstyles";

type Props = {
    pbp: PlayByPlayLogger | undefined,
    postGameTeams: [GameDayTeam, GameDayTeam],
    flavorTeams: [ITeam, ITeam],
    playersOnCourt: [number[], number[]]
};

export function GameWindow(props: Props) {
    return (
        <motion.div initial={{scaleY: .2, scaleX: 1}} animate={{y: [-500, 100], scaleY: [null,null,1]}}>
            <PlayByPlay log={props.pbp} teams={props.postGameTeams} flavorTeams={[props.flavorTeams[0], props.flavorTeams[1]]}
                        playersonCourt={props.playersOnCourt}/>
        </motion.div>
    );
};