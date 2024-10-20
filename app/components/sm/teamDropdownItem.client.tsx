// @flow
import * as React from 'react';
import {motion} from "framer-motion";
import Grid from "@mui/material/Grid2";
import {Box, Divider, Typography} from "@mui/material";
import {ITeam} from "../../../public/playstyles";

type Props = {
    team: ITeam
};

export function TeamDropdownItemClient(props: Props) {
    return (
        <Box bgcolor={'aliceblue'} minHeight={250} maxWidth={'100%'}>
            <motion.div animate={{y: [-50, 0], opacity: [0,1]}}>
                <Grid minWidth={'auto'} columns={10} columnGap={2} container>
                    <Grid size={12} marginBottom={2}>
                        <Typography
                            variant={'h6'}>{props.team.name}</Typography>
                        <Divider variant={'middle'} flexItem></Divider>
                    </Grid>
                    <Grid offset={2} size={2} textAlign={'justify'}>
                        <Typography variant={'h6'}>Physical</Typography>
                        <Divider/>
                        <Grid container>
                        </Grid>
                    </Grid>

                </Grid>
            </motion.div>
        </Box>
    );
};