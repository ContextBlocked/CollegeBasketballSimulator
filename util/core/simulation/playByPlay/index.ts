import {GameDayTeam, statType} from "../run";
import {ITeam} from "../../../../public/playstyles";


type TeamNum = 0 | 1
export type PlayByPlayEventScore = | {
    type: "insideFg";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} | {
    type:"insideFgAndOne";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} | {
    type: "postFg";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} |{
    type: "postFgAndOne";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} | {
    type: "midRangeFg";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} | {
    type: "midRangeFgAndOne";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} | {
    type: "threePtFg";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} | {
    type: "threePtFgAndOne";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} | {
    type: "ft";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} | {
    type: "putBackFg";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
} | {
    type: "putBackFgAndOne";
    team: TeamNum;
    pid: number;
    defenderPid?: number;
    assistPid: number | undefined;
    time: number;
}
export type PlayByPlayEventNoScore = | {
    type: "blockPutBack";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "insideBlock";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "block";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "postBlock";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "midRangeBlock";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "threePtBlock";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "drb";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "insideFgAttempt";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "postFgAttempt";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "midRangeFgAttempt";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "threePtFgAttempt";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "ftAttempt";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "putBackFgAttempt";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "offensiveFoul";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "defensiveFoul";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "techFoul";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "orb";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "overtime";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "half";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "end";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "steal";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "turnover";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "substitution";
    team: TeamNum;
    pid: number;
    time: number;
    defenderPid?: number;
} | {
    type: "timeout";
    team: TeamNum;
    pid: number;
    time: number;
}


export type playByPlayEvent = PlayByPlayEventNoScore | PlayByPlayEventScore | {
    type: "stat";
    team: TeamNum;
    pid: number | undefined;
    stat: statType;
    amount: number;
}
const scoringEvents = ["insideFg", "insideFgAndOne", "postFg", "midRangeFg", "midRangeFgAndOne", "threePtFg", "threePtFgAndOne", "ft", "putBackFg", "putBackFgAndOne"]
const scoringPlay = (event: playByPlayEvent): event is PlayByPlayEventScore => {
    return scoringEvents.includes(event.type)
}
export class PlayByPlayLogger {
    constructor(teamSimIndex: [GameDayTeam, GameDayTeam], teams: [ITeam, ITeam]) {
        this.log = [];
        this.teamSimIndex = teamSimIndex;
        this.teams = teams;
    }
    log: playByPlayEvent[];
    teamSimIndex: [GameDayTeam, GameDayTeam];
    teams: [ITeam, ITeam];
    logEvent(outcome: playByPlayEvent) {
        this.log.push(outcome)
    }

    logStat(team: TeamNum, pid: number | undefined, stat: statType, amount: number) {
        this.log.push({
            type: "stat",
            team,
            pid,
            stat,
            amount
        });
    }

}