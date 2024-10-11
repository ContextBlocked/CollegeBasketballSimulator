// @flow
import * as React from 'react';
import {Box} from "@mui/system";
import {TeamsTable} from "~/components/md/teamsTable";
import {Button} from "@mui/material";

type Props = {

};

export default function GameTeams(props: Props) {
    return (
        <Box>
            <Button>Create Team</Button>
            <TeamsTable/>
        </Box>
    );
};