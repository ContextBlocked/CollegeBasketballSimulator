// @flow
import * as React from 'react';
import {Box, Container, Grid, Stack} from "@mui/system";
import {Alert, Avatar, Badge, Button, Step, StepLabel, Stepper, TextField, Typography} from "@mui/material";

import {TeamInfo} from "~/components/lg/teamInfo";
import {CreateRoster} from "~/components/lg/createRoster";

import {ITeam, offInside, offPlaystyle} from "../../public/playstyles";

import {useToggle} from "~/hooks/use-toggle";
import {ClientActionFunctionArgs, Form, useFetcher, useNavigate} from '@remix-run/react';
import {ActionFunctionArgs} from "@remix-run/router";
import {FormEvent, FormEventHandler, useRef} from "react";
import {CacheOnly, redirect, WorkerActionArgs} from "@remix-pwa/sw";
import {WorkerContext} from "~/entry.worker";
import ReactDOMServer from "react-dom/server";

type Props = {

};
const offIns = offInside



export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData()
    return redirect('/asdaasdd')
}
export const workerAction = async ({request, context}: WorkerActionArgs)=>  {
    const { event, fetchFromServer, database, getCount, caches } = context as WorkerContext;
    let response
    const formData = await request.formData()
    console.log(JSON.parse(formData.get('roster') as string));
    try {
        response = await fetchFromServer()
        console.log(request.formData);
        console.log(response.text());
        await database.Teams.add({
               id: await getCount(),
               name: formData.get('name') as string,
               primaryColor: formData.get('primaryColor') as string,
               secondaryColor: formData.get('secondaryColor') as string,
               hometown: formData.get('hometown') as string,
               playstyle: {
                 defense: "noGuards",
                 offense: {
                     strengths: ["Outside"],
                     average: [ "Man2Man", "noGuards"],
                     weaknesses: ["Inside", "Star"],
                     rebounding: .5,
                 } as offPlaystyle,
               },
               roster: JSON.parse(formData.get('roster') as string)
         })
        return redirect('../teams/view')
    } catch (err) {
        console.log(err);
        return err
    }
}

export default function GameTeamsCreateTeam(props: Props) {
    const [nameRef, hometownRef, primaryColorRef, secondaryColorRef] = [useRef(null), useRef(null), useRef(null), useRef(null)]
    const fetcher = useFetcher()

    const [activeStep, setActiveStep] = React.useState(0);
    const [team, setTeam] = React.useState<ITeam>({
       id: 0,
        name: 'Tigers',
        primaryColor: '',
        secondaryColor: '#FFF',
        hometown: 'Penn State',
        playstyle: {
            defense: "noGuards",
            offense: offInside,
        },
        roster: []

    });
    const [error, setError] = React.useState('');
    const [success, {on , off, toggle}] = useToggle(false)
    function setTeamValue<TKey extends keyof ITeam>(key: TKey, value: ITeam[TKey]) {
        setTeam({...team, [key]: value})
    }
    function back() {
        if (activeStep === 0) return;
            setActiveStep(0);
    }
    function checkError(reason?: "roster" | "name" | "hometown" | "primaryColor" | "secondaryColor") {
        if (!reason) {
            switch ('') {
                case team.name:
                    reason = ('name');
                    break;
                case team.hometown:
                    reason = ('hometown');
                    break;
                case team.primaryColor:
                    reason = ('primaryColor');
                    break;
                case team.secondaryColor:
                    reason = ('secondaryColor');
                    break;
            }
        }
        if (reason === 'roster' && team.roster.length > 2) {
            return setError('');
        }
        switch (reason) {
            default: setError('')
                break
            case "roster":
                setError("You haven't confirmed a roster");
                break;
            case "name":
                setError("You haven't entered a team name");
                break;
            case "hometown":
                setError("You haven't entered a hometown");
                break;
            case "primaryColor":
                setError("You haven't selected a primary color");
                break;
            case "secondaryColor":
                setError("You haven't selected a secondary color");
                break;
        }
        return !!reason;
    }
    const navigate = useNavigate()
    function redirect() {
        navigate('/game/teams/view')
    }
    type formdataT = Omit<ITeam, 'playstyle'>

    async function confirm() {
        const { name, hometown, primaryColor, secondaryColor } = team;
        const roster = JSON.stringify(team.roster);
        // @ts-ignore
        const formData: formdataT = { id: 0, name, hometown, primaryColor, secondaryColor, roster };
        console.log(formData);
        // @ts-ignore
        fetcher.submit(formData, {method: 'post'})
    }
    function next() {
        //console.log(team)
        if (activeStep === 0) {
            if (checkError()) return
        }
        if (activeStep === 1) {
            if (checkError('roster')) return
            confirm()
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    return (
        <Grid container>
            <fetcher.Form>
                <TextField name={'name'} value={team.name} hidden/>
                <TextField name={'primaryColor'} value={team.primaryColor} hidden/>
                <TextField name={'secondaryColor'} value={team.secondaryColor} hidden/>
                <TextField name={'hometown'} value={team.hometown} hidden/>
                <TextField name={'roster'} value={JSON.stringify(team.roster)} hidden/>
                <Grid size={8}>
                <Typography textAlign={'center'} fontWeight={'bold'} variant={'h1'}>Create A Team</Typography>
            </Grid>
            <Grid size={12}>
            {activeStep === 0 ? <TeamInfo setTeamValue={setTeamValue}/> : <CreateRoster setTeamValue={setTeamValue}/>}
            </Grid>

            <Grid marginLeft={-15} marginTop={5} size={12}>
                {error ? <Alert severity={'error'} sx={{marginBottom: 5}}>{error}</Alert> : null}
                {success ? <Alert severity={'success'} sx={{marginBottom: 5}}>Team created successfully. Redirecting...</Alert> : null}
                <Grid marginBottom={5} container>
                    <Grid size={6}>
                        <Button onClick={back} color={'secondary'} variant={'contained'} sx={{marginLeft: '40%', width: '20%'}}>Back</Button>
                    </Grid>
                    <Grid alignContent={'center'} size={6}>
                        <Button onClick={next} variant={'contained'} sx={{marginLeft: '20%', width: '20%'}}>Next</Button>
                    </Grid></Grid>
                <Stepper sx={{marginLeft: -20}} alternativeLabel activeStep={activeStep}>
                    <Step key={1}>
                        <StepLabel>Basic info</StepLabel>
                    </Step>
                    <Step key={2}>
                        <StepLabel>Roster</StepLabel>
                    </Step>
                    <Step key={3}>
                        <StepLabel>Complete</StepLabel>
                    </Step>
                </Stepper>
            </Grid>
            </fetcher.Form>
        </Grid>
    );
};