// @flow
import * as React from 'react';
import {Container, Grid} from "@mui/system";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    IconButton, MenuItem,
    Paper, Select, SelectChangeEvent, SelectProps, Tab, Tabs,
    Typography
} from "@mui/material";
import {RiArrowLeftLine, RiArrowRightLine} from "@remixicon/react";
import {Outlet} from "@remix-run/react";

type Props = {

};

export default function GamePlay(props: Props) {
    const [team, setTeam] = React.useState('Philadelphia');
    const [tab, setTab] = React.useState(0);
    const changeTeam = (e: SelectChangeEvent) => {
        setTeam(e.target.value)
    }
    const changeTab = (e: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    }
    return (
        <Grid spacing={3} size={12} container minWidth={'20%'} maxWidth={'80%'}>
            <Grid size={12}>
                <Typography sx={{fontWeight: 'semibold'}} variant={'h3'} textAlign={'center'}>Play</Typography>
            </Grid>

            <Grid  offset={2} size={2}>
                <Card elevation={0} color={'seondary.main'} sx={{maxWidth: 200, maxHeight: 150, backgroundColor: 'secondary.main'}}>
                    <CardContent sx={{paddingBottom: 0}}>
                        <Typography sx={{fontWeight: 'bold'}} color={'secondary.contrastText'}>PHI VS LAL</Typography>
                        <Typography>Phi: 120</Typography>
                        <Typography>LAL: 110</Typography>
                    </CardContent>
                    <CardActions sx={{padding: 0, margin: 0, justifyContent: 'flex-end'}}>
                        <IconButton sx={{"&.MuiButtonBase-root:hover": {
                                bgcolor: "transparent"
                            }}} focusRipple={false}>
                            <RiArrowRightLine/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Grid size={2}>
                <Card elevation={0} color={'seondary.main'} sx={{maxWidth: 200, maxHeight: 150, backgroundColor: 'secondary.main'}}>
                    <CardContent sx={{paddingBottom: 0}}>
                        <Typography sx={{fontWeight: 'bold'}} color={'secondary.contrastText'}>PHI VS LAL</Typography>
                        <Typography>Phi: 120</Typography>
                        <Typography>LAL: 110</Typography>
                    </CardContent>
                    <CardActions sx={{padding: 0, margin: 0, justifyContent: 'flex-end'}}>
                        <IconButton sx={{"&.MuiButtonBase-root:hover": {
                                bgcolor: "transparent"
                            }}} focusRipple={false}>
                            <RiArrowRightLine/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Grid offset={5} size={1}>
                <Typography>Team:</Typography>
                <Select sx={{minWidth: 150}} value={team} onChange={changeTeam}>
                    <MenuItem value={'Philadelphia'}>Philadelphia</MenuItem>
                    <MenuItem value={'Los Angeles'}>Los Angeles</MenuItem>
                    <MenuItem value={'Chicago'}>Chicago</MenuItem>
                </Select>
            </Grid>
            <Outlet/>
        </Grid>
    );
};