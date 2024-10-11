import type { MetaFunction } from "@remix-run/cloudflare";
import {Test} from "~/components/test";
import {Box, Container, Grid} from "@mui/system";
import {Button, Typography} from "@mui/material";
import {siteSettings} from "../../util/settings/siteSettings";
import {Link} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  return (
    <div className="flex h-screen justify-start">
      <Box maxHeight={500} minWidth={'100%'} color={'primary.contrastText'} bgcolor={'primary.main'}>
        <Grid container>
    <Grid offset={3}>
          <Box marginTop={10}>
            <Typography sx={{textTransform: 'uppercase'}} variant={'h3'}>Welcome to</Typography>
            <Typography marginLeft={10} color={'accent'} sx={{fontWeight: 'bold'}} variant={'h1'}>{siteSettings.siteName}</Typography>
            <Typography marginLeft={15}>Run your own College Basketball team</Typography>
         </Box>
    </Grid>
          <Grid marginTop={10} size={2} offset={6}>
            <Link to={'/game/'}>
            <Button sx={{width: 200, height: 50, fontWeight: 'bold'}} variant={'contained'} color={'accent'}>Play</Button>
            </Link>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
}

