// @flow
import * as React from 'react';
import {Box, Container, Grid} from "@mui/system";
import {Button, ButtonGroup, Typography} from "@mui/material";
import {siteSettings} from "../../../util/settings/siteSettings";

type Props = {

};

export function Nav(props: Props) {
    return (
        <Box zIndex={100} borderBottom={'black'} height={60} bgcolor={'primary.main'} color={'primary.contrastText'}>
            <Grid minHeight={'100%'} display={'flex'} container alignItems={'center'} spacing={10} columns={30}>
            <Grid size={10}>
                <Container>
                    <Typography fontSize={'x-large'} sx={{fontWeight: 'bold'}}>{siteSettings.siteName}</Typography>
                </Container>
            </Grid>
            <Grid textAlign={'center'} size={10}>

            </Grid>
                <Grid textAlign={'center'} size={7}>
                    <Container>
                        <ButtonGroup size={'large'} color={'inherit'} disableRipple>
                            <Button variant={'text'}>Login</Button>
                            <Button variant={'text'}>Signup</Button>
                        </ButtonGroup>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
};