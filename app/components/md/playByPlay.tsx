// @flow
import * as React from 'react';
import {playByPlayEvent, PlayByPlayLogger} from "../../../util/core/simulation/playByPlay/playByPlayLogger";
import {GameDayPlayer, GameDayTeam} from "../../../util/core/simulation/run";
import {ITeam} from "../../../util/core/data/playstyles";
import useChannel from "~/hooks/useChannel";
import {useContext, useEffect} from "react";
import {Box, Grid, Stack} from "@mui/system";
import {
    Timeline, TimelineConnector, TimelineContent, TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    timelineOppositeContentClasses,
    TimelineSeparator
} from "@mui/lab";
import {delay} from "../../../util/core/numbers";
import {pbpmessage} from "../../../public/pbpWorker";
import {pbpWorker} from "~/reducers/pbpReducer/definepbp";
import {Scoreboard} from "~/components/md/scoreboard";
import {set} from "zod";

type Props = {
    log: PlayByPlayLogger | undefined,
    style?: any,
    teams: [GameDayTeam, GameDayTeam]
    flavorTeams: [ITeam, ITeam]
    playersonCourt: [number[], number[]]
};
// debounce for worker initialization
let initialized = false
const initialTeamStats = {
    team1: {
        Points: 0,
        Rebounds: 0,
        Assists: 0,
        Steals: 0,
        Blocks: 0,
        Turnovers: 0,
        FGM: 0,
        FGA: 0,
    },
    team2: {
        Points: 0,
        Rebounds: 0,
        Assists: 0,
        Steals: 0,
        Blocks: 0,
        Turnovers: 0,
        FGM: 0,
        FGA: 0,
    }
};
//for player stats card
type selectedPlayer = [GameDayPlayer, GameDayPlayer]

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function PlayByPlay(props: Props) {
    const [players, setPlayers] = React.useState<Partial<selectedPlayer>>([undefined, undefined])
    const [plays, setPlays] = React.useState<Element[]>([])
    const playersOnCourt = (teamnum: number) => props.teams[teamnum].players.filter(player => props.playersonCourt[teamnum].includes(player.id));
    const [teamStats, setTeamStats] = React.useState(initialTeamStats);
    const [time, setTime] = React.useState(0)
    //https://github.com/remix-run/remix/discussions/4416
    const {broadcast} = useChannel<pbpmessage>({
        channelName: "pbp",
        messageHandler: (message) => {
            console.log(message)
            if (message.data.type === "start") {
                console.log("start")
                initialized = true
            }
        }
    });
    const pbpworker = useContext(pbpWorker) as React.Context<Worker>
    function logstat(event: playByPlayEvent) {
        setTeamStats(prevStats => {
            let newStats = {...prevStats}
            //console.log(event)
            if (event.team === 0) {
                // @ts-ignore
                switch (event?.stat) {
                    case "assist":
                        // @ts-ignore
                        newStats.team1.Assists += event.amount
                        break
                    case "Blocks":
                        // @ts-ignore
                        newStats.team1.Blocks += event.amount
                        break
                    case "Steals":
                        // @ts-ignore
                        newStats.team1.Steals += event.amount
                        break
                    case "Turnovers":
                        // @ts-ignore
                        newStats.team1.Turnovers += event.amount
                        break
                    case "point":
                        // @ts-ignore
                        newStats.team1.Points += event.amount
                        break
                    case "OffReb":
                        // @ts-ignore
                        newStats.team1.Rebounds += event.amount
                        break
                    case "DefReb":
                        // @ts-ignore
                        newStats.team1.Rebounds += event.amount
                        break
                    case "FGA":
                        // @ts-ignore
                        newStats.team1.FGA += event.amount
                        break
                    case "FGM":
                        // @ts-ignore
                        newStats.team1.FGM += event.amount
                        break
                }
            } else {
                // @ts-ignore
                switch (event?.stat) {
                    case "assist":
                        // @ts-ignore
                        newStats.team2.Assists += event.amount
                        break
                    case "Blocks":
                        // @ts-ignore
                        newStats.team2.Blocks += event.amount
                        break
                    case "Steals":
                        // @ts-ignore
                        newStats.team2.Steals += event.amount
                        break
                    case "Turnovers":
                        // @ts-ignore
                        newStats.team2.Turnovers += event.amount
                        break
                    case "point":
                        // @ts-ignore
                        newStats.team2.Points += event.amount
                        break
                    case "OffReb":
                        // @ts-ignore
                        newStats.team2.Rebounds += event.amount
                        break
                    case "DefReb":
                        // @ts-ignore
                        newStats.team2.Rebounds += event.amount
                        break
                    case "FGA":
                        // @ts-ignore
                        newStats.team2.FGA += event.amount
                        break
                    case "FGM":
                        // @ts-ignore
                        newStats.team2.FGM += event.amount
                        break
                }
            }
            return newStats
        })

    }

    const timelineItem = (e: MessageEvent<[string, playByPlayEvent]>) => {
        return (
            <TimelineItem key={crypto.randomUUID()}>
                <TimelineOppositeContent color={'primary'}>{formatTime(e.data[1].time)}</TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>{e.data[0]}</TimelineContent>
            </TimelineItem>
        )
    }

    useEffect( () => {
        if (!props.log) {
            return
        }
        console.log(props)
        pbpworker.onmessage = function (e: MessageEvent<[string, playByPlayEvent]>) {
            console.log(e.data)
            //console.log(e.data)
            // console.log(e.data[1])
            //console.log(e.data[1].type)
            //console.log(e.data)
            setTime(e.data[1].time)
            if (e.data[1].type === "stat") {
                logstat(e.data[1])
                //console.log(teamStats)
            } else {
                setPlays(prevPlays => [timelineItem(e), ...prevPlays])

            }

        }

        const waitforLog = async () => {
            for (let i = 0; i < 10; i++) {
                broadcast({
                    type: "initialize",
                    teams: props.teams,
                    log: props.log?.log

                })
                await delay(1000)

                if (initialized) {
                    pbpworker.postMessage(props.log?.log)
                    break
                }

                if (i === 4) {
                    pbpworker.postMessage(props.log?.log)
                }
            }
        }
        waitforLog()


        //console.log(props.log.log)



    }, [props.log]);

    return (<Grid>
            <Scoreboard points={[teamStats.team1.Points, teamStats.team2.Points]} teams={[props.flavorTeams[0].name, props.flavorTeams[1].name]} time={time}/>
            <Grid offset={3} size={6} bgcolor={'secondary.main'} minHeight={400} maxHeight={500} marginBottom={50} sx={{overflowX: 'hidden', msOverflowStyle: 'none', scrollbarWidth: 'none'}} overflow={'scroll'}>
            <Timeline  sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                }, marginLeft: '25%'
            }}>

                    {plays}


            </Timeline>
        </Grid>
        </Grid>
        );
};