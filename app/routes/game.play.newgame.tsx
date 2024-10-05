// @flow
import * as React from 'react';
import {Grid} from "@mui/system";
import {MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
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
                <Typography>Home Team:</Typography>
                <Select fullWidth value={homeTeam} onChange={changeHomeTeam}>
                    <MenuItem value={'Philadelphia'}>Philadelphia</MenuItem>
                    <MenuItem value={'Los Angeles'}>Los Angeles</MenuItem>
                    <MenuItem value={'Chicago'}>Chicago</MenuItem>
                    <MenuItem value={'Add Team'}>Add Team</MenuItem>
                </Select>
            </Grid>
            <Grid marginTop={5} size={12}>
                <Typography>Away Team:</Typography>
                <Select fullWidth value={awayTeam} onChange={changeAwayTeam}>
                    <MenuItem value={'Philadelphia'}>Philadelphia</MenuItem>
                    <MenuItem value={'Los Angeles'}>Los Angeles</MenuItem>
                    <MenuItem value={'Add Team'}>Add Team</MenuItem>
                </Select>
            </Grid>
            <Grid size={12}>
                <GameSimulation/>
            </Grid>

        </Grid>
    );
};