import React, { useState } from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    Button,
    Paper,
    Grid,
    FormControl,
    InputLabel
} from '@mui/material';
import { styled } from '@mui/system';

const teams = [
    { id: 1, name: 'Philadelphia', abbreviation: 'PHI' },
    { id: 2, name: 'Los Angeles', abbreviation: 'LAL' },
    // Add more teams as needed
];
type Props = {

};

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

export default function DemoSim(props: Props) {
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('Philadelphia');

    const handleStartSimulation = () => {
        if (homeTeam && awayTeam) {
            console.log(`Starting simulation: ${homeTeam} vs ${awayTeam}`);
            // Here you would typically start the actual simulation logic
        }
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#F0F4F8', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1E3A8A', fontWeight: 'bold' }}>
                Play
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <FormControl sx={{ minWidth: 120 }}>
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
                        <FormControl sx={{ minWidth: 120 }}>
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
                        <Button
                            variant="contained"
                            onClick={handleStartSimulation}
                            disabled={!homeTeam || !awayTeam}
                            sx={{ bgcolor: '#1E3A8A', '&:hover': { bgcolor: '#152C69' } }}
                        >
                            Simulate Game
                        </Button>
                    </Box>
                    {homeTeam && awayTeam && (
                        <StyledPaper elevation={1}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {teams.find(t => t.name === homeTeam)?.abbreviation} VS {teams.find(t => t.name === awayTeam)?.abbreviation}
                                </Typography>
                                <Typography variant="body2">
                                    {teams.find(t => t.name === homeTeam)?.abbreviation}: --
                                </Typography>
                                <Typography variant="body2">
                                    {teams.find(t => t.name === awayTeam)?.abbreviation}: --
                                </Typography>
                            </Box>
                            <Typography sx={{ color: 'text.secondary', cursor: 'pointer' }}>→</Typography>
                        </StyledPaper>
                    )}
                </Grid>
                <Grid item xs={12} md={3}>
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
                </Grid>
            </Grid>
        </Box>
    );
};