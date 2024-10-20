// @flow
import * as React from 'react';
import {Box, Grid} from "@mui/system";
import Sidebar from "~/components/lg/sidebar";
import {Outlet} from "@remix-run/react";
import {Nav} from "~/components/lg/nav";
type Props = {

};

export default function Game(props: Props) {
    return (
        <Grid key={'gameGrid'} container direction={'row'}>
            <Sidebar/>

            <Grid offset={2} size={'grow'}>
                <Outlet/>
            </Grid>

        </Grid>
    );
};