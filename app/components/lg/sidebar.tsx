// @flow
import * as React from 'react';
import {Box, Container, Grid, Stack} from "@mui/system";
import {Button, ButtonGroup} from "@mui/material";
import {RiArrowRightLine, RiBarChartLine, RiHome2Line, RiPlayFill, RiPlayLargeLine, RiTeamLine} from "@remixicon/react";
import {Link} from "@remix-run/react";

type Props = {

};
function StatsIcon() {
    return (
        <RiBarChartLine/>
    )
}

export default function Sidebar(props: Props) {
    return (
        <Grid size={3} minWidth={'10%'} maxWidth={'15%'} minHeight={'100vh'} bgcolor={'secondary.main'}>
        <ButtonGroup fullWidth size={'large'} orientation={'vertical'}>
        <Link to={'/'}>
            <Button  startIcon={<RiHome2Line/>} sx={{height: 50, justifyContent: 'flex-start'}} variant={'text'} >Home</Button>
        </Link>
        <Link to={'/game/play/newgame'}>
            <Button startIcon={<RiPlayLargeLine/>}  sx={{height: 50, justifyContent: 'flex-start'}} variant={'text'} >Play</Button>
        </Link>
            <Link to={'/game/teams'}>
            <Button startIcon={<RiTeamLine/>} sx={{height: 50, justifyContent: 'flex-start'}} variant={'text'}>Teams</Button>
        </Link>
            <Link to={'/game/stats'}>
            <Button startIcon={<StatsIcon/>}  sx={{height: 50, justifyContent: 'flex-start'}} variant={'text'}>Stats</Button>
        </Link>
        </ButtonGroup>
        </Grid>
    );
};