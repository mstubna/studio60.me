import 'typeface-montserrat'
import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { CssBaseline, Grid, Link, Typography } from '@material-ui/core'
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles'
import { DateTime } from 'luxon'
import icon from '../images/icon.png'
import '../index.css'

const digitFont = {
  fontFamily: 'Digit',
  color: '#db0308',
}
const dotmatrixFont = {
  fontFamily: 'Dotmatrix',
  color: '#fff555',
}

let theme = createMuiTheme({
  typography: {
    fontSize: 20,
    fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
    useNextVariants: true,
  },
  palette: {
    background: { default: '#000' },
    secondary: { main: '#263238' },
    action: {
      disabled: '#263238e1',
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: ['none'],
  overrides: {
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: '#fff',
        },
      },
    },
    MuiButton: {
      textSecondary: {
        color: '#90a4ae',
      },
    },
  },
})

theme = responsiveFontSizes(theme)

const useStyles = makeStyles({
  mainContainer: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    padding: '0 20px',
    marginBottom: 20,
  },
  quote: {
    fontFamily: 'Open Sans',
    color: '#546e7a',
    fontSize: 20,
    [theme.breakpoints.up('sm')]: {
      fontSize: 'calc(20px * 1.2)',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(20px * 1.6)',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 'calc(20px * 2.0)',
    },
  },
  quoteAuthor: {
    fontWeight: 'bold',
    color: '#546e7a',
    textAlign: 'right',
    marginTop: -5,
    fontSize: 15,
    [theme.breakpoints.up('sm')]: {
      fontSize: 'calc(15px * 1.2)',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(15px * 1.6)',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 'calc(15px * 2.0)',
    },
  },
  timeHeader: {
    ...dotmatrixFont,
    fontSize: 35,
    [theme.breakpoints.up('sm')]: {
      fontSize: 'calc(35px * 1.2)',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(35px * 1.6)',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 'calc(35px * 2.0)',
    },
  },
  timeLabel: {
    ...dotmatrixFont,
    [theme.breakpoints.up('sm')]: {
      fontSize: 'calc(20px * 1.2)',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(20px * 1.6)',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 'calc(20px * 2.0)',
    },
  },
  time: {
    ...digitFont,
    marginRight: 12,
    fontSize: 60,
    [theme.breakpoints.up('sm')]: {
      fontSize: 'calc(60px * 1.2)',
      marginRight: 24,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(60px * 1.6)',
      marginRight: 32,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 'calc(65px * 2.0)',
      marginRight: 50,
    },
  },
  sectionColumn: {
    maxWidth: 100,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'calc(100px * 1.2)',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100px * 1.6)',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'calc(140px * 2.0)',
    },
  },
  gltsContainer: {
    marginTop: 20,
    padding: 10,
  },
  gltsText: {
    fontFamily: 'Open Sans',
    color: '#546e7a',
    textAlign: 'center',
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
      fontSize: 'calc(16px * 1.2)',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(16px * 1.6)',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 'calc(16px * 2.0)',
    },
  },
  gltsLink: {
    color: '#546e7a',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  gltsDate: {
    whiteSpace: 'nowrap',
  },
})

const useAnimationFrame = (callback) => {
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

const showtime = DateTime.fromISO('2020-09-20T09:00:00', { zone: 'America/New_York' })
const quote = 'Time flies like an arrow, fruit flies like a banana.'
const quoteAuthor = 'GMarx'

const IndexPage = () => {
  const classes = useStyles()
  const [, setElapsed] = useState(0)
  const now = DateTime.local()

  const getHoursMinutesSeconds = () => {
    const duration = showtime.diff(now)
    return duration.toFormat('dd hh mm ss').split(' ')
  }

  const [days, hours, minutes, seconds] = getHoursMinutesSeconds()

  useAnimationFrame((deltaTime) => {
    setElapsed((prevElapsed) => prevElapsed + deltaTime)
  })

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Studio60.me</title>
        <meta property='og:title' content='Studio60.me' />
        <meta
          property='og:description'
          content='Studio 60 fansite --- The George Lucas Talk Show'
        />
        <meta property='og:image' content={`https://studio60.me${icon}`} />
        <meta property='og:url' content='https://studio60.me' />
        <meta name='twitter:title' content='Studio60.me' />
        <meta
          name='twitter:description'
          content='Studio 60 fansite --- The George Lucas Talk Show'
        />
        <meta name='twitter:image' content={`https://studio60.me${icon}`} />
        <meta name='twitter:card' content='summary' />
      </Helmet>
      <CssBaseline />
      <div className={classes.mainContainer}>
        <Grid container item direction='column' justify='center' alignItems='center' xs={12}>
          <div className={classes.quoteContainer}>
            <Typography className={classes.quote}>{quote}</Typography>
            <Typography className={classes.quoteAuthor}>{quoteAuthor}</Typography>
          </div>
          <Typography className={classes.timeHeader}>TIME REMAINING</Typography>
          <Grid container item direction='row' justify='center' alignItems='center' xs={12}>
            <Grid
              container
              item
              direction='column'
              alignItems='center'
              className={classes.sectionColumn}
              xs={3}
              sm={2}
            >
              <Typography className={classes.timeLabel}>DAYS</Typography>
              <Typography className={classes.time}>{days}</Typography>
            </Grid>
            <Grid
              container
              item
              direction='column'
              alignItems='center'
              className={classes.sectionColumn}
              xs={3}
              sm={2}
            >
              <Typography className={classes.timeLabel}>HOURS</Typography>
              <Typography className={classes.time}>{hours}</Typography>
            </Grid>
            <Grid
              container
              item
              direction='column'
              alignItems='center'
              className={classes.sectionColumn}
              xs={3}
              sm={2}
            >
              <Typography className={classes.timeLabel}>MINUTES</Typography>
              <Typography className={classes.time}>{minutes}</Typography>
            </Grid>
            <Grid
              container
              item
              direction='column'
              alignItems='center'
              className={classes.sectionColumn}
              xs={3}
              sm={2}
            >
              <Typography className={classes.timeLabel}>SECONDS</Typography>
              <Typography className={classes.time}>{seconds}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            className={classes.gltsContainer}
            alignItems='center'
            justify='center'
            xs={12}
          >
            <Typography className={classes.gltsText}>
              Watch{' '}
              <Link className={classes.gltsLink} href='https://twitter.com/GLucasTalkShow'>
                The George Lucas Talk Show
              </Link>
              <br />
              <span className={classes.gltsDate}>on September 20th, 2020 at 09:00 ET</span>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default IndexPage
