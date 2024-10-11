// @flow
import * as React from 'react';
import {Grid} from "@mui/system";
import {IconButton, Typography} from "@mui/material";
import {RiArrowRightLine} from "@remixicon/react";

type Props = {
    name: string,
    wins: number,
    losses: number,
    created: string
};

export function TeamsTableItem(props: Props) {
    return (
        <Grid justifyContent={'flex-end'} maxHeight={'30'} maxWidth={'100%'} bgcolor={'aliceblue'} borderBottom={1} container direction={'row'}>
            <Grid size={2}>
                <Typography sx={{height: '100%', marginTop: '1%'}}>{props.name}</Typography>
            </Grid>
            <Grid size={4}>
                <Typography sx={{height: '100%', marginTop: '1%'}}>{props.wins}/{props.losses}</Typography>
            </Grid>
            <Grid size={4}>
                <Typography sx={{height: '100%', marginTop: '1%'}}>{props.created}</Typography>
            </Grid>
            <Grid size={2}>
                <IconButton sx={{maxHeight: '80%', maxWidth: '25%'}}><RiArrowRightLine size={'100%'}/></IconButton>
            </Grid>
        </Grid>
    );
};