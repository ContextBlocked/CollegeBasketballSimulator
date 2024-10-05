// @flow
import * as React from 'react';
import {Box, Grid} from "@mui/system";
import {
    Button,
    Divider,
    Fade,
    FormControl,
    Grow,
    InputLabel,
    List,
    ListItem, ListItemText,
    MenuItem, Paper,
    Select,
    Typography
} from "@mui/material";
import {useState} from "react";
import { styled } from '@mui/system';

const teams = [
    { id: 1, name: 'Philadelphia', abbreviation: 'PHI' },
    { id: 2, name: 'Los Angeles', abbreviation: 'LAL' },
    // Add more teams as needed
];

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[100]
}));

const GameLog = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxHeight: '300px',
    overflow: 'auto',
    backgroundColor: theme.palette.grey[100]
}));
type Props = {

};

export default function Newsim(props: Props) {
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('Philadelphia');
    const [gameStarted, setGameStarted] = useState(false);
    const [gameLog, setGameLog] = useState([]);

    const handleStartGame = () => {
        if (homeTeam && awayTeam) {
            setGameStarted(true);
            // Simulate game events (this would be replaced with your actual game simulation logic)
            const sampleEvents = [
                { time: '10:40', event: 'Mason James scores from midrange assisted by Thomas Foster' },
                { time: '10:53', event: 'David Nguyen grabs a offensive rebound' },
                { time: '10:54', event: 'David Nguyen attempts a three' },
                { time: '11:14', event: 'Everett Cooper scores in the post' },
                { time: '11:35', event: 'Elijah Morris grabs a defensive rebound' },
            ];
            setGameLog(sampleEvents);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#F0F4F8', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1E3A8A', fontWeight: 'bold' }}>
                Play
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <Grow in={!gameStarted}>
                        <Box>
                            <Typography variant="h6" gutterBottom>Select your teams</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Home Team</InputLabel>
                                        <Select
                                            value={homeTeam}
                                            label="Home Team"
                                            onChange={(e) => setHomeTeam(e.target.value)}
                                        >
                                            {teams.map((team) => (
                                                <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Away Team</InputLabel>
                                        <Select
                                            value={awayTeam}
                                            label="Away Team"
                                            onChange={(e) => setAwayTeam(e.target.value)}
                                        >
                                            {teams.map((team) => (
                                                <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleStartGame}
                                    disabled={!homeTeam || !awayTeam}
                                    sx={{ bgcolor: '#1E3A8A', '&:hover': { bgcolor: '#152C69' } }}
                                >
                                    PLAY GAME
                                </Button>
                            </Box>
                        </Box>
                    </Grow>

                    <Fade in={gameStarted}>
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" gutterBottom>Game Log</Typography>
                            <GameLog elevation={3}>
                                <List>
                                    {gameLog.map((log, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={log.event}
                                                    secondary={log.time}
                                                    primaryTypographyProps={{ variant: 'body2' }}
                                                    secondaryTypographyProps={{ variant: 'caption' }}
                                                />
                                            </ListItem>
                                            {index < gameLog.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </GameLog>
                        </Box>
                    </Fade>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledPaper elevation={3}>
                        <Typography variant="body1" gutterBottom>Team:</Typography>
                        <FormControl fullWidth>
                            <Select
                                value={selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value)}
                            >
                                {teams.map((team) => (
                                    <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Box>
    );
};