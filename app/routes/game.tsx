// @flow
import * as React from 'react';
import {Box, Grid} from "@mui/system";
import Sidebar from "~/components/lg/sidebar";
import {Outlet} from "@remix-run/react";
type Props = {

};

export default function Game(props: Props) {
    return (
        <Grid key={'gameGrid'} spacing={2} container direction={'row'}>
            <Sidebar/>
            <Grid size={'grow'}>
                <Outlet/>
            </Grid>

        </Grid>
    );
};