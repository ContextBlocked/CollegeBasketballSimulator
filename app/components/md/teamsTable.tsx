// @flow
import * as React from 'react';
import {Box, Container, Grid} from "@mui/system";
import {IconButton, Paper, Typography, Link} from "@mui/material";
import {TeamsTableItem} from "~/components/sm/teamsTableItem";
import {RiArrowRightLine} from "@remixicon/react";

type Props = {

};
let teams = []<string>
let filledTeams = [
    'Philadelphia',
    'Los Angeles',
    'Brooklyn',
    'Milwaukee',
    'Phoenix',
    'Utah',
    'Denver',
    'Miami',
    'Boston',
    'Dallas',
    'Portland',
    'Golden State',
    'Atlanta',
    'New York',
    'LA Clippers',
    'Memphis',
    'Washington',
    'Charlotte',
    'Indiana',
    'San Antonio',
    'Sacramento',
    'New Orleans',
    'Chicago',
    'Toronto',
    'Minnesota',
    'Orlando',
    'Detroit',
    'Houston',
    'Cleveland',
    'Oklahoma City'
]

export function TeamsTable(props: Props) {
    const teamsMap = teams.map((team, index) => {
        return (
            <TeamsTableItem name={team} wins={0} losses={index} created={'2021-10-10'}/>
        )
    })
    console.log(teamsMap)
    const noTeams = <Box><Typography textTransform={'capitalize'} variant={'h4'} color={'textDisabled'} sx={{paddingTop: '20%'}}>Teams you create will appear here...</Typography>
        <Link href={'#'}>Create a Team</Link></Box>

    return (
        <Grid textAlign={'center'} container marginTop={10} size={'grow'}>
            <Paper elevation={12} sx={{minWidth: '70%', minHeight: 400, maxHeight: 600}}>
                <Box maxHeight={'10%'}>
                    <Grid position={'sticky'} maxHeight={'30'} maxWidth={'100%'} bgcolor={'aliceblue'} borderBottom={1} container direction={'row'}>
                        <Grid size={2}>
                            <Typography sx={{height: '100%', marginTop: '1%'}}>Team Name</Typography>
                        </Grid>
                        <Grid size={4}>

                            <Typography sx={{height: '100%', marginTop: '1%'}}>Wins/Losses</Typography>

                        </Grid>
                        <Grid size={4}>
                            <Typography sx={{height: '100%', marginTop: '1%'}}>Time Created</Typography>
                        </Grid>
                        <Grid size={2}>
                        </Grid>
                    </Grid>

                </Box>
                <Box maxHeight={'95%'} overflow={'hidden'} sx={{overflowY: 'scroll'}}>
                  {teamsMap.length > 0 ? teamsMap : noTeams}
                </Box>
            </Paper>
        </Grid>
    );
};