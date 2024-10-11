// @flow
import * as React from 'react';
import {Container, Grid} from "@mui/system";
import {Card, CardContent, CardHeader, MenuItem, Paper, Select, SelectChangeEvent, Typography} from "@mui/material";
import GameSimulation from "~/components/md/gameSimulation";

type Props = {

};

export default function GamePlayNewgame(props: Props) {
   const [homeTeam, setHomeTeam] = React.useState('Sixers');
    const [awayTeam, setAwayTeam] = React.useState('Lakers');

    const changeHomeTeam = (e: SelectChangeEvent) => {
        setHomeTeam(e.target.value);
    }
    const changeAwayTeam = (e: SelectChangeEvent) => {
        setAwayTeam(e.target.value);
    }
    return (
        <Grid container size={'grow'}>
            <Grid size={12}>
                <Typography textAlign={'center'} variant={'subtitle1'}>Select your teams</Typography>
            </Grid>
            <Grid size={12}>
                <Card sx={{borderRadius: 4}} variant={'outlined'} raised >

                    <CardContent>
                        <Typography  variant={'h6'} fontWeight={'bold'}>Home Team:</Typography>

                        <Select sx={{height: 40}} fullWidth value={awayTeam} onChange={changeAwayTeam}>
                            <MenuItem value={'Philadelphia'}>Philadelphia</MenuItem>
                            <MenuItem value={'Los Angeles'}>Los Angeles</MenuItem>
                            <MenuItem value={'Add Team'}>Add Team</MenuItem>
                        </Select>
                    </CardContent>
                </Card>
            </Grid>
            <Grid marginTop={5} size={12}>
                <Card sx={{borderRadius: 4}} variant={'outlined'} raised >

                    <CardContent>
                        <Typography variant={'h6'} fontWeight={'bold'}>Home Team:</Typography>

                        <Select sx={{height: 40}} fullWidth value={awayTeam} onChange={changeAwayTeam}>
                            <MenuItem value={'Philadelphia'}>Philadelphia</MenuItem>
                            <MenuItem value={'Los Angeles'}>Los Angeles</MenuItem>
                            <MenuItem value={'Add Team'}>Add Team</MenuItem>
                        </Select>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={12}>
                <GameSimulation/>
            </Grid>

        </Grid>
    );
};