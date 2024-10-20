// @flow
import * as React from 'react';
import Grid from "@mui/material/Grid2";
import { Button, TextField} from "@mui/material";
import {Box} from "@mui/system";
import {Table} from "~/components/md/table";
import {generateRoster} from "../../../util/core/functions/teams/generateRoster";
import {getHeightbyCentimeter} from "../../../util/core/numbers";
import {TableItem} from "~/components/sm/tableItem";
import {PlayerDropdownItemClient} from "~/components/sm/playerDropdownItem.client";
import {IPlayer} from "../../../util/core/functions/players/generatePlayer";
import {set} from "zod";
import {ITeam} from "../../../public/playstyles";

type Props = {
    setTeamValue: <TKey extends keyof ITeam>(key: TKey, value: ITeam[TKey]) => void
};

export function CreateRoster(props: Props) {
    const [roster, setRoster] = React.useState(generateRoster({}))
    const players = roster.map((player) => {
        const plrdata = [
            player.human.firstName + ' ' + player.human.lastName,
            player.position.abbreviation,
            Math.floor(player.ratings.Overall),
            getHeightbyCentimeter(player.human.height),
            player.human.weight,
            player.human.Age,
            player.human.Nationality
        ]
        return (

            <TableItem data={plrdata}>
                <PlayerDropdownItemClient player={player}></PlayerDropdownItemClient>
            </TableItem>

        )
    })
    //console.log(players)
    function confirmRoster(roster: IPlayer[]) {
        props.setTeamValue('roster', roster)
    }
    return (
        <Box minHeight={500} >
            <Grid>
                <Table dropDownArea columnNames={['Name', 'Pos','Ovr', 'Height', 'Weight', 'Age', 'Hometown']}>
                    {players}
                </Table>
            </Grid>
            <Grid marginTop={5} offset={1} container>
                <Grid size={3}>
                    <Button onClick={() => setRoster(generateRoster({}))} variant={'contained'} sx={{marginLeft: '30%', width: '60%'}}>Regenerate</Button>
                </Grid>
                <Grid size={3}>
                    <Button onClick={() => confirmRoster(roster)} variant={'contained'} sx={{marginLeft: '30%', width: '60%'}}>Confirm</Button>
                </Grid>
            </Grid>

        </Box>
    );
};