// @flow
import * as React from 'react';
import {Grid, Stack} from "@mui/system";
import {Avatar, Badge, Button, Step, StepLabel, Stepper, TextField, Typography} from "@mui/material";
import {RiAddFill} from "@remixicon/react";
import {ColorPicker} from "~/components/md/colorPicker";
import * as events from "node:events";
import {ChangeEvent, ReactEventHandler} from "react";
import {set} from "zod";
import {IPlayer} from "../../../util/core/functions/players/generatePlayer";
import {ITeam} from "../../../public/playstyles";

type Props = {
    setTeamValue: <TKey extends keyof ITeam>(key: TKey, value: ITeam[TKey]) => void
};
export function TeamInfo({setTeamValue}: Props) {

    return (
        <Grid minHeight={500} container>
            <Grid marginTop={5} marginLeft={4} size={12} container >
                <Grid offset={2}>
                    <Stack direction={'column'}>
                        <Typography textAlign={'center'}>Primary Color</Typography>
                        <ColorPicker name={'primaryColor'} onClick={(e  ) => setTeamValue('primaryColor', e)}/>

                        <Typography marginTop={2} textAlign={'center'}>Secondary Color</Typography>

                        <ColorPicker name={'secondaryColor'} onClick={(e  ) => setTeamValue('secondaryColor', e)}/>

                    </Stack>
                </Grid>
            </Grid>

            <Grid marginTop={2} size={8} container>
                <Stack minWidth={'100%'}>
                <Typography>What is your team called?</Typography>
                <TextField onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTeamValue('name', e.target.value)} name={'name'} fullWidth size={'small'} label={'Tigers'}/>
                </Stack>
            </Grid>

            <Grid size={8} container>
                <Stack minWidth={'100%'}>
                <Typography>Where is your team from?</Typography>
                <TextField onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTeamValue('name', e.target.value)} id={'team-create-form'} name={'hometown'} fullWidth size={'small'} label={'Penn State'}/>
                </Stack>
            </Grid>
        </Grid>
    );
};