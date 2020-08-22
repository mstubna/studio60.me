import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
  typography: {
    fontSize: 30,
    fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
    useNextVariants: true,
  },
  palette: {
    background: { default: '#f5f5f5' },
    primary: { main: '#263238' },
    secondary: { main: '#ff8f00' },
    action: {
      disabled: '#263238e1',
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: ['none'],
  overrides: {},
})

theme = responsiveFontSizes(theme)

export default theme
