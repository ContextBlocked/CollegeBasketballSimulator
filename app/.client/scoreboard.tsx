import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';


type Props = {
time: number;
teams: [string, string];
points: [number, number];
};
let time: number = 0

export function Scoreboard(props: Props) {
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    if (props.time !== time && props.time !== undefined) {
            time = props.time

    }
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <motion.div initial={{scaleY: 0}} animate={{scaleY: [null, 1], transition: {delay: 1}}}>
            <Paper elevation={3} className="p-4">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" className="mb-4">
                            {props.teams[0]} vs {props.teams[1]}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h5" align="center">
                            Home
                        </Typography>
                        <Typography variant="h2" align="center" className="mb-2">
                            {props.points[0] / 2}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                            <Typography variant="h3">{formatTime(time)}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h5" align="center">
                            Away
                        </Typography>
                        <Typography variant="h2" align="center" className="mb-2">
                            {props.points[1] / 2}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </motion.div>

    );
};