import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation'
const primary = {
    main: '#1E3A8A',
    dark: '#1A3275',
    light: '#6888DE',
    contrastText: '#FFF'
}
const secondary = {
    main :'#E2E8F0',
    dark: '#D7DFEA',
    light: '#F2F4F8',
    contrastText: '#292524'
}
let theme = createTheme({
    palette: {
        mode: 'light',
        primary: primary,
        secondary: secondary,
    },
    components: {
        MuiTimeline: {
            styleOverrides: {
                root: {
                    backgroundColor: 'primary',
                },
            },
        },
    },
})




theme = createTheme(theme, {
    palette: {
        accent: theme.palette.augmentColor({
            color: {
                main: '#EA580C'
            }
        })
    }
})

declare module '@mui/material/styles' {
    interface Palette {
        accent: Palette['primary'];
    }
    interface PaletteOptions {
        accent?: PaletteOptions['primary']
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        accent: true;
    }
}
declare module '@mui/material/Typography' {
    interface ButtonPropsColorOverrides {
        accent: true;
    }
}

export default theme;
