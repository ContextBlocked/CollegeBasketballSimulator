// @flow
import * as React from "react";
import { Box, Container, Grid } from "@mui/system";
import {
  Button,
  ButtonGroup,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { siteSettings } from "../../../util/settings/siteSettings";
import theme from "~/mui/theme";

type Props = {};

export function Nav(props: Props) {
  const sm = useMediaQuery(theme.breakpoints.up("xs"));
  return (
    <Grid
      gap={0}
      borderBottom={"black"}
      bgcolor={"primary.main"}
      color={"primary.contrastText"}
      container
      alignItems={"center"}
      height={"8vh"}
      width={"100vw"}
      maxWidth={1}
      margin={0}
    >
      <Grid size={"grow"}>
        <Typography paddingLeft={2} fontWeight={"bold"} variant={"h2"}>
          {siteSettings.siteName}
        </Typography>
      </Grid>
      <Grid
        offset={0}
        size={{ xs: 5, sm: 4, md: 4, lg: 5, xl: 4 }}
        textAlign={"center"}
      >
        <Button fullWidth color={"inherit"} size={"large"} variant={"text"}>
          Log in
        </Button>
      </Grid>
    </Grid>
  );
}
