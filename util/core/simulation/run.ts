import {simSettings} from "../../settings/simSettings";
import {GameSimBase} from "./gameSimBase";
import {getRandom, uniform} from "../numbers";
import {IPlayer} from "../functions/players/generatePlayer";
import {offInside, offOutside, offPlaystyle, offStar, teamDefensePlaystyle} from "../data/playstyles";
import {Positions} from "../data/positions";
import {PlayByPlayLogger} from "./playByPlay/playByPlayLogger";


export type shotType = "putBack" | "atRim" | "post" | "midRange" | "threePt" | "halfCourt" | "fullCourt" | "ft";
export type statType = "assist" | "point" | "block" | "defReb" | "offReb" | "steal" | "turnover" | "foul" | "foulsDrawn" | "ftm" | "fta" | "fgm" | "fga" | "threePtM" | "threePtA" | "atRimFg" | "atRimFgA" | "postFg" | "postFgA" | "midRangeFg" | "midRangeFgA" | "putBackFg" | "putBackFgA" | "offensiveFoul" | "defensiveFoul" | "techFoul" | "flagrantFoul"
const insideShotTypes: shotType[] = ["putBack", "atRim", "post"]
const midRangeShotTypes: shotType[] = ["midRange"]
const outsideShotTypes: shotType[] = ["threePt", "halfCourt", "fullCourt"]

type possOutcome = "turnover" | "fg" | "foul" | "ft" | "eoh" | "orb" | "drb" | "timeout"
export type teamNum = 0 | 1

export type GameDayPlayer = {
    id: number,
    player: IPlayer,
    stamina: number,
    stats: { [key in statType]: number }
}
export type GameDayTeam = {
    id: number,
    players: GameDayPlayer[],
    playstyle: {
        defense: teamDefensePlaystyle;
        offense: offPlaystyle;
    }
    stats: { [key in statType]: number }
}
type playerNumOnCourt = number
type clockFactor = ReturnType<GameSim["getClockFactor"]>;

function getBestScoringRating(player: IPlayer) {
    const { Inside, Mid, Outside, FT } = player.ratings.ScoringRatings
    const ratings = [
        { type: 'Inside', value: Inside },
        { type: 'Mid', value: Mid },
        { type: 'Outside', value: Outside },
        { type: 'FT', value: FT }
    ];
    return ratings.reduce((best, current) => {
        return current.value > best.value ? current : best;
    }).type;
}
function getRandomHotspot(hotspots: { type: string, value: number }[]): { type: string, value: number } {
    const totalValue = hotspots.reduce((sum, hotspot) => sum + hotspot.value, 0);
    let randomValue = Math.random() * totalValue;
    for (const hotspot of hotspots) {
        randomValue -= hotspot.value;
        if (randomValue <= 0) {
            return hotspot;
        }
    }
    // Fallback in case of rounding errors
    return hotspots[hotspots.length - 1];
}

export class GameSim extends GameSimBase {
    teams: [GameDayTeam, GameDayTeam]
    playersOnCourt: [number[], number[]]
    time: number
    shotClock: number = simSettings.shotClock
    quarter: number
    foulsThisQuarter: number[]
    offense: teamNum
    defense: teamNum
    timeouts: [number, number] = [simSettings.startingTimeouts, simSettings.startingTimeouts]
    clockRunning = true
    prevPoss: possOutcome
    possDuration: number = 0
    playByPlay: PlayByPlayLogger
    lastOrbPlayer: playerNumOnCourt = 0

    constructor({gid, teams, pbpLog} : {gid: number, teams: [GameDayTeam, GameDayTeam], pbpLog: PlayByPlayLogger}) {
        super({gid});
        this.teams = teams
        this.playersOnCourt = [[0,1,2,3,4], [0,1,2,3,4]]
        this.time = simSettings.quarterLength * 60
        this.quarter = 1
        this.foulsThisQuarter = [0,0]
        this.offense = 0
        this.defense = 1
        this.prevPoss = "eoh"
        this.playByPlay = pbpLog
    }
    getFirstPlayersOfEachPosition(gameTeam: teamNum): number[] {
        const positions = Positions.map(pos => pos.id);
        const players = this.teams[gameTeam].players;
        const playersOnCourt: number[] = [];

        positions.forEach(position => {
            const gamePlayer = players.findIndex(player => player.player.position.id === position);
            if (gamePlayer !== -1) {
                playersOnCourt.push(gamePlayer);
            }
        });

        return playersOnCourt;
    }

    run() {
        this.playersOnCourt = [this.getFirstPlayersOfEachPosition(0), this.getFirstPlayersOfEachPosition(1)];
        this.simRegulation()
        
        const playersPoints = this.teams.map(team => team.players.map(player => player.stats.point))
        console.log(playersPoints)
        type Playerstats = {
            number: number;
            name: string;
            pts: number;
            ast: number;
            to: number;
            pf: number;
            fgm: number;
            fga: number;
            ftm: number;
            fta: number;
            threePtM: number;
            threePtA: number;
            offReb: number;
            defReb: number;
        }
        type Teamstats = {
            pts: number;
            ast: number;
            to: number;
            pf: number;
            fgm: number;
            fga: number;
            ftm: number;
            fta: number;
            threePtM: number;
            threePtA: number;
            offReb: number;
            defReb: number;
        }

        const stats = {
            Playerstats: {
                Team0: Array<Playerstats>(),
                Team1: Array<Playerstats>(),
            },
            Teamstats: {
                Team0: Array<Teamstats>(),
                Team1: Array<Teamstats>(),
            }
        }

        this.playersOnCourt.forEach((team, teamIndex) => {
            team.forEach(playerIndex => {
                const player = this.teams[teamIndex].players[playerIndex];
                // @ts-ignore
                stats.Playerstats[`Team${teamIndex}`].push({
                    number: player.id,
                    name: `${player.player.human.firstName} ${player.player.human.lastName}`,
                    pts: player.stats.point,
                    ast: player.stats.assist,
                    to: player.stats.turnover,
                    pf: player.stats.foul,
                    fgm: player.stats.fgm,
                    fga: player.stats.fga,
                    ftm: player.stats.ftm,
                    fta: player.stats.fta,
                    threePtM: player.stats.threePtM,
                    threePtA: player.stats.threePtA,
                    offReb: player.stats.offReb,
                    defReb: player.stats.defReb
                });
            });
        })
        console.log(stats)

        stats.Teamstats.Team0.push({
            pts: this.teams[0].stats.point,
            ast: this.teams[0].stats.assist,
            to: this.teams[0].stats.turnover,
            pf: this.teams[0].stats.foul,
            fgm: this.teams[0].stats.fgm,
            fga: this.teams[0].stats.fga,
            ftm: this.teams[0].stats.ftm,
            fta: this.teams[0].stats.fta,
            threePtM: this.teams[0].stats.threePtM,
            threePtA: this.teams[0].stats.threePtA,
            offReb: this.teams[0].stats.offReb,
            defReb: this.teams[0].stats.defReb
        });
        stats.Teamstats.Team1.push({
            pts: this.teams[1].stats.point,
            ast: this.teams[1].stats.assist,
            to: this.teams[1].stats.turnover,
            pf: this.teams[1].stats.foul,
            fgm: this.teams[1].stats.fgm,
            fga: this.teams[1].stats.fga,
            ftm: this.teams[1].stats.ftm,
            fta: this.teams[1].stats.fta,
            threePtM: this.teams[1].stats.threePtM,
            threePtA: this.teams[1].stats.threePtA,
            offReb: this.teams[1].stats.offReb,
            defReb: this.teams[1].stats.defReb
        });

        return {
            gid: this.id,
            overtimes: this.overtimes,
            teams: this.teams,
        }
    
    
    }
    
    getClockFactor(): string {
        const pointDifferential = this.teams[this.offense].stats.point - this.teams[this.defense].stats.point
        //run out clock if win
        const period = this.quarter
        if (period >= simSettings.quarters && this.time <= simSettings.shotClock && pointDifferential > 0) {
            return "runOutClock"
        }
        if (period >= simSettings.quarters && this.time <= simSettings.shotClock && pointDifferential < 0) {
            return "intentionalFoul"
        }
        if (this.time <= simSettings.shotClock && (period <= simSettings.quarters || pointDifferential >= 0)) {
            return "holdForBuzzer"
        }
        if (period >= simSettings.quarters && ((this.time <= 3 * 60 && pointDifferential <= -10) || (this.time <= 2 * 60 && pointDifferential <= -5) || (this.time <= 1 * 60 && pointDifferential <= 0))) {
            return "catchUp"
        }
        if (period >= simSettings.quarters && ((this.time <= 3 * 60 && pointDifferential >= 10) || (this.time <= 2 * 60 && pointDifferential >= 5) || (this.time <= 1 * 60 && pointDifferential >= 0))) {
            return "maintainLead"
        }
        if (this.time >= simSettings.shotClock && this.time <= simSettings.shotClock * 2) {
            return "twoForOne"
        }
        return "score"
    }

    advanceClock(amount: number) {
        this.time -= amount
    }

    backCourt(clockFactor: clockFactor) {
        let dt = getRandom(3,7)
        if (clockFactor === "maintainLead") {
            dt = getRandom(7, 10)
        } else if (clockFactor === "catchUp" || clockFactor === "twoForOne") {
            dt = getRandom(3, 6)
        } else if (clockFactor === "holdForBuzzer") {
            dt = getRandom(2,this.time - 1 > 0 ? (this.time - 1 > 10 ? 10 : this.time - 1) : 2)
        }
        this.advanceClock(dt)
    }

    getPossOutcome(clockFactor: clockFactor) {
        const startInFront = this.prevPoss === "orb" || this.prevPoss === "timeout"
        if (startInFront && this.time < 120) {
            const pointDifferential = this.teams[this.offense].stats.point - this.teams[this.defense].stats.point
            if (this.time > 60 && pointDifferential >= -21) {
                let comebackAttempt = false
                if (this.time > 60 && pointDifferential >= -21) {
                    comebackAttempt = true
                }
                if (this.time > 30 && pointDifferential >= -18) {
                    comebackAttempt = true
                }
                if (this.time > 20 && pointDifferential >= -15) {
                    comebackAttempt = true
                }
                if (this.time > 10 && pointDifferential >= -12) {
                    comebackAttempt = true
                }
                if (this.time > 5 && pointDifferential >= -9) {
                    comebackAttempt = true
                }
                if (this.time > 2 && pointDifferential >= -6) {
                    comebackAttempt = true
                }
                if (comebackAttempt) {
                    let takeTimeout = false
                    if (this.time < 5) {
                        takeTimeout = true
                    }
                    if (this.time < 25 && this.clockRunning) {
                        takeTimeout = true
                    }
                    if (this.time < 60 && this.clockRunning) {
                        if ((this.time - 25) / (60 - 25) < Math.random()) {
                            takeTimeout = true
                        }
                    }
                    if (takeTimeout) {
                        this.clockRunning = false
                        this.timeouts[this.offense] -= 1
                        return "timeout"
                    }
                }
            }
        }
        if (clockFactor === "runOutClock") {
            this.advanceClock((Math.max()))
            return "eoh"
        }
        this.backCourt(clockFactor)
        const putback = this.prevPoss === "orb" && this.time < 1.5
        /*if (clockFactor === "intentionalFoul") {
            return "ft"
        }
        if (clockFactor === "runOutClock") {
            return "endOfQuarter"
        }
        if (clockFactor === "holdForBuzzer") {
            return "fg"
        }
        if (clockFactor === "catchUp") {
            return "fg"
        }
        if (clockFactor === "maintainLead") {
            return "fg"
        }
        if (clockFactor === "twoForOne") {
            return "fg"
        }
        if (clockFactor === "score") {
            return "fg"
        }*/
        let player = this.pickShooter(clockFactor)
        //console.log(player)
        return this.shoot( this.playersOnCourt[this.offense][player], clockFactor, startInFront, putback)
    }

    simPossession() {
        this.offense = this.offense === 1 ? 0 : 1
        this.defense = this.offense === 1 ? 0 : 1
        const dtInbound = this.inbound();
        this.advanceClock(dtInbound)
        this.possDuration = 0
        this.clockRunning = true
        const clockFactor = this.getClockFactor()
        const outcome = this.getPossOutcome(clockFactor)
        this.prevPoss = outcome
        if (outcome === "orb") {
            this.offense = this.offense === 1 ? 0 : 1
            this.defense = this.offense === 1 ? 0 : 1
        }
        return
    }

    inbound() {
        let dt = 0;

        if (
            (this.prevPoss === "fg" ||
                this.prevPoss === "ft") &&
            this.clockRunning
        ) {
            // Time to gather ball after shot was made, and then to inbound it too
            dt += getRandom(1, 5);
        }

        return dt;
    }

    jumpBall() {
        return 0
    }

    simRegulation() {
        let half = 1
        while (half <= simSettings.quarters) {
            if (half !== 1) {
                //console.log("halftime")
                this.time = simSettings.quarterLength * 60
                //only 2 halves
                //substitutions?
                //other team gets possession?
            }
            const finalPeriod = half === simSettings.quarters
            while (this.time > 0) {
                // console.log(this.time)
                this.simPossession()
            }
            if (finalPeriod) {
                console.log(this.teams[0].stats.point, this.teams[1].stats.point)
                break
            }
            half += 1
            this.foulsThisQuarter = [0, 0]
            this.time = simSettings.quarterLength
        }
    }

    exertStamina(playerNum: playerNumOnCourt) {
        this.teams[this.offense].players[playerNum].stamina -= 5
        this.teams[this.offense].players.forEach(player => {
            if (player.stamina > 100) {
                player.stamina += -2
            }})
        this.teams[this.defense].players.forEach(player => {
            if (player.stamina > 100) {
                player.stamina += 3
            }
        })
    }

    logStat(stat: statType, player: playerNumOnCourt, amount: number, team: teamNum = this.offense) {
        this.teams[team].stats[stat] += amount
        this.teams[team].players[player].stats[stat] += amount
        this.playByPlay.logStat(team, player, stat, amount)

    }
    pickRebounder(team: teamNum) {
        const players = this.playersOnCourt[team].map(playerIndex => this.teams[team].players[playerIndex]);
        const scores = players.map(player => {
            const reboundingRating = player.player.ratings.SkillRatings.Rebounding;
            const height = player.player.human.height;
            return reboundingRating * 0.7 + height * 0.3;
        });
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        let randomValue = Math.random() * totalScore;
        for (let i = 0; i < scores.length; i++) {
            randomValue -= scores[i];
            if (randomValue <= 0) {
                return this.playersOnCourt[team][i];
            }
        }
        return this.playersOnCourt[team][scores[getRandom(0, scores.length - 1) - 1]];
    }

    pickShooter(clockFactor: string) {
        const playersStamina = this.playersOnCourt[this.offense].map(player =>
            this.teams[this.offense].players[player].stamina
        );
        const offensivePlaystyle = this.teams[this.offense].playstyle.offense
        const defensivePlaystyle = this.teams[this.defense].playstyle.defense
        let guards = this.playersOnCourt.slice(0, 2)
        let starPlayer = this.playersOnCourt[this.offense].map(player =>
            //placeholder until overall calculation function is made
            this.teams[this.offense].players[player].player.ratings.ScoringRatings.Outside
        )
        let ratingFactors = this.playersOnCourt[this.offense].map(player =>
            this.teams[this.offense].players[player].player.ratings.Overall
        )
        if (offensivePlaystyle === offOutside) {
            ratingFactors = this.playersOnCourt[this.offense].map(player =>
                this.teams[this.offense].players[player].player.ratings.ScoringRatings.Outside
            )
        } else if (offensivePlaystyle === offInside) {
            ratingFactors = this.playersOnCourt[this.offense].map(player =>
                this.teams[this.offense].players[player].player.ratings.ScoringRatings.Inside
            )
        }
        let player = Math.floor(Math.random() * this.playersOnCourt[this.offense].length);
        if (ratingFactors) {
            player = ratingFactors.reduce((bestPlayer, currentRating, index) => {
                const combinedValue = currentRating + playersStamina[index];
                const bestCombinedValue = ratingFactors[bestPlayer] + playersStamina[bestPlayer];
                return combinedValue > bestCombinedValue ? index : bestPlayer;
            }, 0);
        }
        if (offensivePlaystyle === offStar) {
            player = starPlayer.reduce((bestPlayer, currentRating, index) => {
                return currentRating > starPlayer[bestPlayer] ? index : bestPlayer;
            }, 0);
        }
        const bestScoringRating = getBestScoringRating(this.teams[this.offense].players[player].player)
        return player

    }

    getHotZones(player: GameDayPlayer) {
        const { Inside, Mid, Outside, FT } = player.player.ratings.ScoringRatings;

        const ratings = [
            { type: 'Inside', value: Inside },
            { type: 'Mid', value: Mid },
            { type: 'Outside', value: Outside },
            { type: 'FT', value: FT }
        ];
        ratings.sort((a, b) => b.value - a.value);
        ratings.pop()
        return ratings
    }

    getPointsForShotType(shotType: shotType) {
        let points = 0

        if (insideShotTypes.includes(shotType)) {
            points = 2
        } else if (midRangeShotTypes.includes(shotType)) {
            points = 2
        } else if (outsideShotTypes.includes(shotType)) {
            points = 3
        } else if (shotType === "ft"){
            points = 1
        }
        return points
    }

    foul(defender: number) {
        const player = this.teams[this.defense].players[defender]
        this.logStat("foul", defender, 1, this.defense)
        this.playByPlay.logEvent({
            type: "defensiveFoul",
            team: this.defense,
            pid: defender,
            time: this.time
        })
        //handle foul out
    }

    freeThrow(shooter: playerNumOnCourt, amount: number) {
        const plr = this.teams[this.offense].players[shooter]
        const shotSuccess = plr.player.ratings.ScoringRatings.FT / 100;
        for (let i = 0; i < amount; i++) {
            const rnd = Math.random()
            const success = rnd <= shotSuccess
            this.logStat("fta", shooter, 1)
            this.playByPlay.logEvent({
                type: "ftAttempt",
                team: this.offense,
                pid: shooter,
                time: this.time
            })
            if (success) {
                this.playByPlay.logEvent({
                    type: "ft",
                    team: this.offense,
                    pid: shooter,
                    assistPid: undefined,
                    time: this.time
                })
                this.logStat("ftm", shooter, 1)
                this.logStat("point", shooter, 1)
            } else if (i === amount) {
                this.rebound()
            }
        }
    }

    rebound() {
        let dt = getRandom(0, 2)
        this.advanceClock(dt)
        const rnd = Math.random()
        const success = rnd < this.teams[this.offense].playstyle.offense.rebounding
        if (success) {
            const player = this.pickRebounder(this.offense)

            this.lastOrbPlayer = player
            this.logStat("offReb", player, 1)
            this.playByPlay.logEvent({
                type: "orb",
                team: this.offense,
                pid: player,
                time: this.time
            })
            this.possDuration = 14
            return "orb"
        } else {
            const player = this.pickRebounder(this.defense)

            this.logStat("defReb", player, 1,this.defense)
            this.playByPlay.logEvent({
                type: "drb",
                team: this.defense,
                pid: player,
                time: this.time
            })
            return "drb"
        }

    }

    pickPlayer(team: teamNum, rating: "Block" | "Steal" | "Assist" | "Turnover" = "Assist") {
        const players = this.playersOnCourt[team].map(playerIndex => this.teams[team].players[playerIndex]);

        let finalScores = players.map(player => {
            const passRating = player.player.ratings.SkillRatings.Passing;
            const speed = player.player.ratings.SkillRatings.Handling; // better ball handlers get slightly faster passes
            return passRating * 0.7 + speed * 0.1;
        });
        switch (rating) {
            case "Block":
                finalScores = players.map(player => {
                    const defenseRating = player.player.ratings.SkillRatings.Defense;
                    const height = player.player.ratings.PhysicalRatings.Height; // taller players get easier blocks
                    return defenseRating * 0.7 + height * 0.3; // Adjust weights as needed
                });
                break;
            case "Steal":
                finalScores = players.map(player => {
                    const defenseRating = player.player.ratings.SkillRatings.Defense;
                    const speed = player.player.ratings.PhysicalRatings.Speed; // faster players get easier steals
                    return defenseRating * 0.7 + speed * 0.2; // Adjust weights as needed
                });
                break;
            case "Turnover":
                const maxScore = Math.max(...players.map(player => {
                    const passRating = player.player.ratings.SkillRatings.Handling;
                    const speed = player.player.ratings.Overall;
                    return passRating * 0.7 + speed * 0.1;
                }));

                finalScores = players.map(player => {
                    const passRating = player.player.ratings.SkillRatings.Handling;
                    const speed = player.player.ratings.Overall;
                    const originalScore = passRating * 0.7 + speed * 0.1;
                    return maxScore - originalScore; // Inverse the score
                });
                break;
        }
        const totalScore = finalScores.reduce((sum, score) => sum + score, 0);
        let rnd = Math.random() * totalScore;
        for (let i = 0; i < finalScores.length; i++) {
            rnd -= finalScores[i];
            if (rnd <= 0) {
                return this.playersOnCourt[team][i];
            }
        }
    }

    getTeamChance(team: teamNum, rating: "Block" | "Steal" | "Assist" | "Turnover" = "Assist") {
        const players = this.playersOnCourt[team].map(playerIndex => this.teams[team].players[playerIndex]);

        let finalScores: number[] = []
        switch (rating) {
            case "Steal":
                finalScores = players.map(player => {
                    const defenseRating = player.player.ratings.SkillRatings.Defense;
                    const speed = player.player.ratings.SkillRatings.Handling;
                    return defenseRating * 0.7 + speed * 0.1;
                });
                break;
            case "Block":
                finalScores = players.map(player => {
                    const defenseRating = player.player.ratings.SkillRatings.Defense;
                    const height = player.player.human.height;
                    return defenseRating * 0.7 + height * 0.3;
                });
                break;
            case "Assist":
                finalScores = players.map(player => {
                    const passRating = player.player.ratings.SkillRatings.Passing;
                    const speed = player.player.ratings.SkillRatings.Handling;
                    return passRating * 0.7 + speed * 0.1;
                });
                break;
        }
        return finalScores.reduce((sum, score) => sum + score, 0);

    }

    steal(defender: playerNumOnCourt, player: playerNumOnCourt) {
        if (Math.random() < this.getTeamChance(this.defense, "Steal") * 0.0001) {
            this.logStat("steal", defender, 1, this.defense)
            this.logStat("turnover", player, 1, this.offense)
            this.playByPlay.logEvent({
                type: "steal",
                team: this.defense,
                pid: defender,
                time: this.time
            })
            return true
        }
        return false
    }

    block(defender: playerNumOnCourt, player: playerNumOnCourt) {
        if (Math.random() < this.getTeamChance(this.defense, "Block") * .0001) {
            this.logStat("block", defender, 1, this.defense)
            this.playByPlay.logEvent({
                type: "block",
                team: this.defense,
                pid: defender,
                time: this.time
            })
            return true
        }
        return false
    }

    shoot(shooter: playerNumOnCourt, clockFactor: clockFactor, frontCourt: boolean, putback: boolean) {
        if (putback) {
            shooter = this.lastOrbPlayer
        }
        const player = this.teams[this.offense].players[shooter]
        let passer: playerNumOnCourt | undefined
        let minPlayDuration = Math.min(this.time / 2, 2)
        let maxPlayDuration = Math.min(this.shotClock - this.possDuration, this.time - 0.1)
        if (maxPlayDuration < 0) {
            maxPlayDuration = 0
            minPlayDuration = 0
        }

        let dt = this.time <= 0.3 ? uniform(0, maxPlayDuration) :
            this.time < 1 ? uniform(0.2, maxPlayDuration) :
                maxPlayDuration - minPlayDuration < 4 ? uniform(minPlayDuration, maxPlayDuration) :
                    getRandom(minPlayDuration, maxPlayDuration);

        this.advanceClock(dt + .1)
       //console.log("dt " + dt)
        const defender = this.playersOnCourt[this.defense][this.playersOnCourt[this.offense].indexOf(shooter)]
        const defenseRating = this.teams[this.defense].players[defender].player.ratings.SkillRatings.Defense

        const shotTypeConst = ["atRim", "halfCourt", "lowPost", "midRange", "threePt"]

        let chosenShotType = shotTypeConst[getRandom(0, 5) - 1] as shotType
        const hotspots = this.getHotZones(player)
        const zone = getRandomHotspot(hotspots)
        if (zone.type === "Inside") {
            chosenShotType = Math.floor(Math.random() * 2) === 0 ? "atRim" : "post"
        } else if (zone.type === "Mid") {
            chosenShotType = "midRange"
        } else if (zone.type === "Outside") {
            chosenShotType = Math.floor(Math.random() * 3) === 0 ? "threePt" : "halfCourt"
        }
        const shot = this.getPointsForShotType(chosenShotType)
        let shotSuccess = zone.value - (defenseRating / 2);
        const rnd = Math.random()
        //console.log(zone.value, zone.type, defenseRating, shotSuccess, shotSuccess / 100, rnd, (rnd <= shotSuccess / 100) )
        //difficult last second shots
        if (this.time <= 0) shotSuccess += (this.time * 10)
        const success = rnd <= shotSuccess / 100;
        this.logStat("fga", shooter, 1)
        this.exertStamina(shooter)
        //console.log("chance " + this.getTeamChance(this.offense, "Assist"))
        if(Math.random() < this.getTeamChance(this.offense, "Assist")  * 0.001) {
            passer = this.pickPlayer(this.offense, "Assist")
        }
        if (this.steal(defender, shooter)) {
            return "turnover"
        }
        if (this.block(defender, shooter)) {
            return "turnover"
        }

        if (!success) {
            let type = "miss"
            switch (chosenShotType) {
                case "atRim":
                    type = "atRimFgAttempt"
                    break
                case "putBack":
                    type = "insideFgAttempt"
                    break
                case "post":
                    type = "postFgAttempt"
                    break
                case "midRange":
                    type = "midRangeFgAttempt"
                    break
                case "threePt":
                    type = "threePtFgAttempt"
                    break
                case "halfCourt":
                    type = "threePtFgAttempt"
                    break
                case "fullCourt":
                    type = "threePtFgAttempt"
                    break
            }
            // @ts-ignore
            this.playByPlay.logEvent({
                type: type,
                team: this.offense,
                pid: shooter,
                assistPid: undefined,
                time: this.time})
            return this.rebound()
        } else {
            return this.Fg(shooter, passer, chosenShotType, defender)
        }



    }

    Fg(shooter: playerNumOnCourt, assisted: playerNumOnCourt | undefined, type: shotType, defender: playerNumOnCourt): possOutcome {
        const player = this.teams[this.offense].players[shooter]
        let passer = assisted
        let passerPlayer: GameDayPlayer
        if (assisted) {
            passerPlayer = this.teams[this.offense].players[assisted] ?? undefined
        }
        this.logStat("fgm", shooter, 1)
        this.logStat("point", shooter, this.getPointsForShotType(type))
        const foulChance = (1 - (this.teams[this.defense].players[defender].player.ratings.SkillRatings.Defense / 100)) * .5
        const fouled = Math.random() < foulChance

        if (type === "atRim") {
            this.playByPlay.logEvent({
                type: fouled ? "insideFgAndOne" : "insideFg",
                team: this.offense,
                pid: shooter,
                assistPid: undefined,
                time: this.time})
            this.logStat("atRimFg", shooter, 1)
            this.logStat("atRimFgA", shooter, 1)
        } else if (type === "post") {
            this.playByPlay.logEvent({
                type: fouled ? "postFgAndOne" : "postFg",
                team: this.offense,
                pid: shooter,
                assistPid: passer,
                time: this.time})
            this.logStat("postFg", shooter, 1)
            this.logStat("postFgA", shooter, 1)
        } else if (type === "midRange") {
            this.playByPlay.logEvent({
                type: fouled ? "midRangeFgAndOne" : "midRangeFg",
                team: this.offense,
                pid: shooter,
                assistPid: passer,
                time: this.time})
            this.logStat("midRangeFg", shooter, 1)
            this.logStat("midRangeFgA", shooter, 1)
        } else if (type === "threePt") {
            this.playByPlay.logEvent({
                type: fouled ? "threePtFgAndOne" : "threePtFg",
                team: this.offense,
                pid: shooter,
                assistPid: passer,
                time: this.time})
            this.logStat("threePtA", shooter, 1)
            this.logStat("threePtM", shooter, 1)
        } else if (type === "halfCourt") {
            this.playByPlay.logEvent({
                type: fouled ? "threePtFgAndOne" : "threePtFg",
                team: this.offense,
                pid: shooter,
                assistPid: passer,
                time: this.time})
            this.logStat("threePtA", shooter, 1)
            this.logStat("threePtM", shooter, 1)
        }
        if (passer) {
            this.logStat("assist", passer, 1)
        }
        if (fouled) {
            this.clockRunning = false
            //pickplayer
            this.foul(defender)
            if (type === "threePt" || type === "halfCourt" || type === "fullCourt") {
                this.freeThrow(shooter, 1)
            } else {
                this.freeThrow(shooter, 2)
            }
        }
        if (this.time <= 2 * 60) {
            this.clockRunning = false
        }

        return "fg"
    }

}
