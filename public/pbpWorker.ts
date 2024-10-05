import {GameDayTeam, teamNum} from "../util/core/simulation/run";
import {playByPlayEvent} from "../util/core/simulation/playByPlay/playByPlayLogger";

let teams: [GameDayTeam, GameDayTeam]
export type pbpmessage = {
    type: "initialize" | "start",
    teams: [GameDayTeam, GameDayTeam],
    log: playByPlayEvent[]
}
const pbpbroadcast = new BroadcastChannel("pbp")
pbpbroadcast.onmessage = function(e: MessageEvent<pbpmessage>) {
    if (e.data.type === "initialize") {
        teams = e.data.teams
        pbpbroadcast.postMessage({type: "start", log: null})
    }

}

let speed = 1
const broadcast = new BroadcastChannel("speed")
broadcast.onmessage = function(e: MessageEvent<number>) {
    speed = e.data

}
function getPlayerFromPid (pid: number, team: teamNum) {
    console.log(teams)
   const player = teams[team].players.find(player => player.id === pid)
    return player.player.human.firstName + " " + player.player.human.lastName
}
function generateFlavorText(event: playByPlayEvent) {
    switch (event.type) {
        case "insideFg":
            const message = getPlayerFromPid(event.pid, event.team) + " scores inside"
            if (event.assistPid) {
                return message + " assisted by " + getPlayerFromPid(event.assistPid, event.team)
            }
            return message
        case "insideFgAndOne":
            const message1 = getPlayerFromPid(event.pid, event.team) + " scores inside and one"
            if (event.assistPid) {
                return message1 + " assisted by " + getPlayerFromPid(event.assistPid, event.team)
            }
            return message1
        case "insideFgAttempt":
            return getPlayerFromPid(event.pid, event.team) + " attempts a shot inside"
        case "postFgAttempt":
            return getPlayerFromPid(event.pid, event.team) + " attempts a post shot"
        case "postFg":
            const message2 = getPlayerFromPid(event.pid, event.team) + " scores in the post"
            if (event.assistPid) {
                return message2 + " assisted by " + getPlayerFromPid(event.assistPid, event.team)
            }
            return message2
        case "postFgAndOne":
            const message7 = getPlayerFromPid(event.pid, event.team) + " scores in the post and one"
            if (event.assistPid) {
                return message7 + " assisted by " + getPlayerFromPid(event.assistPid, event.team)
            }
            return message7
        case "midRangeFg":
            const message3 = getPlayerFromPid(event.pid, event.team) + " scores from midrange"
            if (event.assistPid) {
                return message3 + " assisted by " + getPlayerFromPid(event.assistPid, event.team)
            }
            return message3
        case "midRangeFgAndOne":
            const message6 = getPlayerFromPid(event.pid, event.team) + " scores from midrange and one"
            if (event.assistPid) {
                return message6 + " assisted by " + getPlayerFromPid(event.assistPid, event.team)
            }
            return message6
        case "midRangeFgAttempt":
            return getPlayerFromPid(event.pid, event.team) + " attempts a midrange shot"
        case "threePtFg":
            const message4 = getPlayerFromPid(event.pid, event.team) + " scores from three"
            if (event.assistPid) {
                return message4 + " assisted by " + getPlayerFromPid(event.assistPid, event.team)
            }
            return message4
        case "threePtFgAndOne":
            const message5 = getPlayerFromPid(event.pid, event.team) + " scores from three and one"
            if (event.assistPid) {
                return message5 + " assisted by " + getPlayerFromPid(event.assistPid, event.team)
            }
            return message5
        case "threePtFgAttempt":
            return getPlayerFromPid(event.pid, event.team) + " attempts a three"
        case "ftAttempt":
            return getPlayerFromPid(event.pid, event.team) + " attempts a free throw"
        case "ft":
            return getPlayerFromPid(event.pid, event.team) + " makes a free throw"
        case "threePtBlock":
            return getPlayerFromPid(event.pid, event.team) + " blocks shot"
        case "postBlock":
            return getPlayerFromPid(event.pid, event.team) + " blocks post shot"
        case "insideBlock":
            return getPlayerFromPid(event.pid, event.team) + " blocks inside shot"
        case "blockPutBack":
            return getPlayerFromPid(event.pid, event.team) + " blocks putback"
        case "steal":
            return getPlayerFromPid(event.pid, event.team) + " steals the ball"
        case "turnover":
            return getPlayerFromPid(event.pid, event.team) + " turns the ball over"
        case "orb":
            return getPlayerFromPid(event.pid, event.team) + " grabs a offensive rebound"
        case "drb":
            return getPlayerFromPid(event.pid, event.team) + " grabs a defensive rebound"
        case "defensiveFoul":
            return getPlayerFromPid(event.pid, event.team) + " commits a defensive foul"
        case "offensiveFoul":
            return getPlayerFromPid(event.pid, event.team) + " commits a offensive foul"
        case "timeout":
            return event.team + " calls a timeout"
        case "end":
            return "End of the quarter"
        case "block":
            return getPlayerFromPid(event.pid, event.team) + " blocks shot"
    }
}
let nextspeed = 100
onmessage = async function(e: MessageEvent<playByPlayEvent[]>) {
    let index = 0;
    let accumulatedTime = 0;
    //console.log("started")
    const intervalId = setInterval(() => {
        accumulatedTime += (100 * ((speed === 0 ? 1 : speed) * 2));
        //console.log(speed)
       // console.log("reached " + accumulatedTime)
        if (accumulatedTime >= 1000) {
           // console.log("reached")
            accumulatedTime = 0;
            if (index < e.data.length) {
             //   console.log("posting" + e.data[index])
                if (e.data[index].type === "stat") {
                    postMessage(["stat", e.data[index]]);
                } else {
                 //   console.log(e.data[index].type)
                    postMessage([generateFlavorText(e.data[index]), e.data[index]])
                }
                //console.log(e.data[index]);
                index++;
                if (e.data[index + 1].type === "stat") {
                    accumulatedTime = 999999
                } else {
                    nextspeed = 100
                }
                //console.log(nextspeed)
            } else {
                //console.log("cleared")
                clearInterval(intervalId);
            }
        }
    }, nextspeed);
}