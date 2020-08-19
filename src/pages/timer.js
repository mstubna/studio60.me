import 'typeface-montserrat'
import 'typeface-open-sans'
import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { Button, CssBaseline, Grid, Typography } from '@material-ui/core'
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import { Duration } from 'luxon'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import '../timer.css'

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
    fontSize: 30,
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
  quoteContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  quote: {
    fontFamily: 'Open Sans',
    color: '#546e7a',
    [theme.breakpoints.up('xl')]: {
      fontSize: 60,
    },
  },
  quoteAuthor: {
    fontSize: 24,
    [theme.breakpoints.up('xl')]: {
      fontSize: 48,
    },
    fontWeight: 'bold',
    color: '#546e7a',
    textAlign: 'right',
    marginLeft: '100%',
    marginTop: -20,
  },
  timeHeader: {
    fontSize: 100,
    ...dotmatrixFont,
    marginBottom: -20,
    [theme.breakpoints.up('lg')]: {
      fontSize: 150,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 200,
    },
  },
  timeLabel: {
    fontSize: 50,
    ...dotmatrixFont,
    marginBottom: -30,
    [theme.breakpoints.up('lg')]: {
      fontSize: 75,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 100,
      marginLeft: 30,
      marginRight: 30,
    },
  },
  time: {
    fontSize: 200,
    ...digitFont,
    marginRight: 50,
    [theme.breakpoints.up('lg')]: {
      fontSize: 325,
      marginTop: -40,
      marginBottom: -30,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 500,
      marginTop: -80,
      marginRight: 80,
      marginBottom: -60,
    },
  },
  sectionColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 20px',
    minWidth: 300,
  },
  buttonGroup: {
    marginBottom: 20,
  },
  button: {
    marginLeft: 14,
    marginRight: 14,
    [theme.breakpoints.up('xl')]: {
      fontSize: 40,
    },
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
  }, [])
}

const TimerPage = () => {
  const classes = useStyles()
  const [elapsed, setElapsed] = useState(0)
  const [pausedElapsed, setPausedElapsed] = useState(0)
  const [running, setRunning] = useState(false)

  const quote = 'Time flies like an arrow, fruit flies like a banana.'
  const quoteAuthor = 'GMarx'

  useAnimationFrame((deltaTime) => {
    setElapsed((prevElapsed) => prevElapsed + deltaTime)
  })

  const fullScreenHandle = useFullScreenHandle()

  const handleStartStop = () => {
    if (running) {
      setPausedElapsed(elapsed)
    } else {
      setElapsed(pausedElapsed)
    }
    setRunning(!running)
  }

  const handleReset = () => {
    setElapsed(0)
    setPausedElapsed(0)
  }

  const getHoursMinutesSeconds = () => {
    const duration = Duration.fromMillis(running ? elapsed : pausedElapsed)
    return duration.toFormat('hh mm ss').split(' ')
  }

  const [hours, minutes, seconds] = getHoursMinutesSeconds()

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Studio60.me Timer</title>
      </Helmet>
      <CssBaseline />
      <FullScreen handle={fullScreenHandle}>
        <div style={{ overflow: 'hidden', minWidth: 1024 }}>
          <Grid
            container
            item
            direction='column'
            justify='center'
            alignItems='center'
            xs={12}
          >
            <div className={classes.quoteContainer}>
              <Typography className={classes.quote}>{quote}</Typography>
              <Typography className={classes.quoteAuthor}>
                {quoteAuthor}
              </Typography>
            </div>
            <Typography className={classes.timeHeader}>TIME ELAPSED</Typography>
            <Grid
              container
              item
              direction='row'
              justify='center'
              alignItems='center'
            >
              <div className={classes.sectionColumn}>
                <Typography className={classes.timeLabel}>HOURS</Typography>
                <Typography className={classes.time}>{hours}</Typography>
              </div>
              <div className={classes.sectionColumn}>
                <Typography className={classes.timeLabel}>MINUTES</Typography>
                <Typography className={classes.time}>{minutes}</Typography>
              </div>
              <div className={classes.sectionColumn}>
                <Typography className={classes.timeLabel}>SECONDS</Typography>
                <Typography className={classes.time}>{seconds}</Typography>
              </div>
            </Grid>
          </Grid>
          <Grid
            className={classes.buttonGroup}
            item
            container
            direction='row'
            justify='center'
            alignItems='center'
            xs={12}
          >
            <Button
              className={classes.button}
              color='secondary'
              title='Fullscreen'
              onClick={
                fullScreenHandle.active
                  ? fullScreenHandle.exit
                  : fullScreenHandle.enter
              }
            >
              {fullScreenHandle.active ? (
                <FullscreenExitIcon />
              ) : (
                <FullscreenIcon />
              )}
            </Button>
            <Button
              className={classes.button}
              color='secondary'
              onClick={handleReset}
              disabled={running}
            >
              Reset
            </Button>
            <Button
              className={classes.button}
              color='secondary'
              onClick={handleStartStop}
            >
              {running ? 'Pause' : 'Start'}
            </Button>
          </Grid>
        </div>
      </FullScreen>
    </ThemeProvider>
  )
}

export default TimerPage
