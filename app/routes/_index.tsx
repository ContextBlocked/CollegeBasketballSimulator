import type { MetaFunction } from "@remix-run/cloudflare";
import {Test} from "~/components/test";
import {Box, Container} from "@mui/system";
import {Typography} from "@mui/material";
import {siteSettings} from "../../util/settings/siteSettings";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  return (
    <div className="flex h-screen justify-start">

      <Box maxHeight={400} minWidth={'100%'} color={'primary.contrastText'} bgcolor={'primary.main'}>
        <Container>
          <Box marginTop={10}>
            <Typography sx={{textTransform: 'uppercase'}} variant={'h3'}>Welcome to</Typography>
            <Typography marginLeft={10} color={'accent'} sx={{fontWeight: 'bold'}} variant={'h1'}>{siteSettings.siteName}</Typography>
            <Typography marginLeft={15}>Run your own College Basketball team</Typography>
          </Box>
           </Container>

      </Box>
    </div>
  );
}

