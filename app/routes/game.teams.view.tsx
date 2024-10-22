// @flow
import * as React from 'react';
import {Grid} from "@mui/system";
import {Button, Stack, Typography} from "@mui/material";
import {Table} from "~/components/md/table";
import {defer, Link, useLoaderData} from "@remix-run/react";
import {WorkerLoaderArgs} from "@remix-pwa/sw";
import {WorkerContext} from "~/entry.worker";
import {TableItem} from "~/components/sm/tableItem";
import {ITeam} from "../../public/playstyles";
import {json} from "@remix-run/router/utils";

type Props = {

};

export async function loader() {
    return json({teams: []})
}
export const workerLoader = async ({context}: WorkerLoaderArgs) => {
   try {
        const {fetchFromServer, database} = context as WorkerContext
        const [serverResult, clientResult] = await Promise.allSettled([

            fetchFromServer()
                .then((response) => response.json())
            .then((data) => data),
            database.Teams.toArray()


        ])

        console.log(clientResult)
        const teams = clientResult.value
        console.log(teams)
        return json({teams})
    } catch (e) {
        console.error(e)
    }
/*
    const {database} = context as WorkerContext
    const dbarray = database.Teams.toArray()
    return json({teams: dbarray})
*/

}
export default function GameTeamsView(props: Props) {
    console.log('sdsd')
    const { teams } = useLoaderData<loader>()
    console.log(teams);
    const teamsMap = teams?.map((team: ITeam) => {
       return (
            <TableItem data={[team.id, team.name, team.hometown]}>

            </TableItem>
        )
    })
    return (
        <Grid container>
            <Grid size={8}>
                <Typography textAlign={'center'} fontWeight={'bold'} variant={'h1'}>Teams</Typography>
            </Grid>


            <Grid marginTop={10} gap={2} direction={'column'} container size={12}>

                <Grid offset={6}>
                    <Link to={'/game/teams/createTeam'}>
                        <Button size={'medium'} variant={'contained'}>Create a new team</Button>
                    </Link>
                </Grid>

                <Table emptyMessage={'Teams you create will appear here...'} columnNames={['id', 'Name', 'Hometown']}>

                    {teamsMap}

                </Table>



            </Grid>
        </Grid>
    );
};