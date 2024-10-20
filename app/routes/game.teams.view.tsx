// @flow
import * as React from 'react';
import {Grid} from "@mui/system";
import { Typography} from "@mui/material";
import {Table} from "~/components/md/table";
import { ITeam } from '../../public/playstyles';
import {defer, useLoaderData} from "@remix-run/react";
import {WorkerLoaderArgs} from "@remix-pwa/sw";
import {TableItem} from "~/components/sm/tableItem";
import {WorkerContext} from "~/entry.worker";
import {json} from "@remix-run/node";

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
    const { teams } = useLoaderData<typeof loader>()
    console.log(JSON.stringify(teams))
    console.log('adsaasf')
    /* const teams = teamsDB?.map((team) => {

       return (
            <TableItem data={[team.id, team.name, team.hometown]}>

            </TableItem>
        )
    })*/
    return (
        <Grid container>
            <Grid size={8}>
                <Typography textAlign={'center'} fontWeight={'bold'} variant={'h1'}>Teams</Typography>
            </Grid>

            <Grid container size={12}>
                <Table emptyMessage={'Teams you create will appear here...'} columnNames={['id', 'Name', 'Hometown']}>


                </Table>

            </Grid>

        </Grid>
    );
};