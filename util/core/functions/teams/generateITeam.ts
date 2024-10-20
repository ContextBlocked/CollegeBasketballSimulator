import {ITeam, offInside} from "../../../../public/playstyles";
import {generateRoster} from "./generateRoster";

export function generateITeam(name: string, id: number): ITeam {
    if (!name) name = "New Team"

         return ({
            id: id,
            name: name,
            hometown: "New City",
            primaryColor: "blue",
            secondaryColor: "white",
            playstyle: {
                defense: "noGuards",
                offense: offInside,
            },
            roster: generateRoster({})
        })

}