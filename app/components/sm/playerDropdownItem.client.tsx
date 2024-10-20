// @flow
import * as React from 'react';
import {Box, Button, Divider, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Stack} from "@mui/system";
import {generatePlayer, IPlayer} from "../../../util/core/functions/players/generatePlayer";
import { motion } from 'framer-motion';

type Props = {
player: IPlayer
};

export function PlayerDropdownItemClient(props: Props) {
    return (

        <Box bgcolor={'aliceblue'} minHeight={250} maxWidth={'100%'}>
            <motion.div animate={{y: [-50, 0], opacity: [0,1]}}>
                <Grid minWidth={'auto'} columns={10} columnGap={2} container>
                    <Grid size={12} marginBottom={2}>
                        <Typography
                            variant={'h6'}>{props.player.human.firstName + " " + props.player.human.lastName}</Typography>
                        <Divider variant={'middle'} flexItem></Divider>
                    </Grid>
                    <Grid offset={2} size={2} textAlign={'justify'}>
                        <Typography variant={'h6'}>Physical</Typography>
                        <Divider/>
                        <Grid container>
                            <Grid size={6}>
                                <Typography>Height:</Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.PhysicalRatings.Height}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Weight: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.PhysicalRatings.Weight}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Speed: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.PhysicalRatings.Speed}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Jump: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.PhysicalRatings.Jump}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={2} textAlign={'justify'}>
                        <Typography variant={'h6'}>Skill</Typography>
                        <Divider/>
                        <Grid container>
                            <Grid size={6}>
                                <Typography>Offense:</Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.SkillRatings.Offense}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Defense: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.SkillRatings.Defense}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Handle: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.SkillRatings.Handling}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Pass: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.SkillRatings.Passing}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Rebound: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.SkillRatings.Rebounding}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={2} textAlign={'justify'}>
                        <Typography variant={'h6'}>Scoring</Typography>
                        <Divider/>
                        <Grid container>
                            <Grid size={6}>
                                <Typography>Outside:</Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.ScoringRatings.Outside}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Inside: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.ScoringRatings.Inside}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Mid: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.ScoringRatings.Mid}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography>Free Throw: </Typography>
                            </Grid>
                            <Grid textAlign={'end'} size={4}>
                                <Typography>{props.player.ratings.ScoringRatings.FT}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </motion.div>
        </Box>

)
    ;
};