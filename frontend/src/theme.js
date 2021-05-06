import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0EED0E',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#191919',
      dark: '#191919',
      main: '#212121',
      light: '#333333',
      light2: '#4F4F4F',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      desktop: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 8,
});

export default theme