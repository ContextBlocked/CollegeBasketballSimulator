import type { MetaFunction } from "@remix-run/cloudflare";
import { Test } from "~/components/test";
import { Box, Container, Grid } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { siteSettings } from "../../util/settings/siteSettings";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Box
      maxHeight={"100vh"}
      width={"100%"}
      color={"primary.contrastText"}
      bgcolor={"primary.main"}
    >
      <Grid container direction={"column"}>
        <Container>
          <Grid rowGap={3} paddingTop={10} container direction={"column"}>
            <Grid>
              <Typography
                fontWeight={"bold"}
                sx={{ textTransform: "uppercase" }}
                variant={"h2"}
              >
                Welcome to
              </Typography>
            </Grid>
            <Grid offset={1}>
              <Typography color={"accent"} fontWeight={"bold"} variant={"h1"}>
                {siteSettings.siteName}
              </Typography>
            </Grid>
            <Grid offset={1}>
              <Typography variant={"body2"}>
                Run your own College Basketball team
              </Typography>
            </Grid>
          </Grid>
          <Grid marginTop={10} size={2} offset={6}>
            <Link to={"/game/"}>
              <Button
                sx={{ width: "10px", height: 50, fontWeight: "bold" }}
                variant={"contained"}
                color={"accent"}
              >
                Play
              </Button>
            </Link>
          </Grid>
        </Container>
        <Box marginBottom={100} />
      </Grid>
    </Box>
  );
}
