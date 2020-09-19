import 'typeface-montserrat'
import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import { makeStyles, ThemeProvider, duration } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import { Button, CssBaseline, Grid, Slider, Slide, TextField, Typography } from '@material-ui/core'
import Header from '../components/header'
import theme from '../components/theme'
import { getSketch, parseData } from '../data'
import icon from '../images/icon.png'
import { images } from '../images/characterImages'
import '../index.css'

const useStyles = makeStyles({
  subtitle: {
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3rem',
    },
  },
  inputContainer: {},
  textInput: {
    marginTop: 20,
    marginBottom: 20,
  },
  transitionContainer: {
    minHeight: 240,
  },
  slideContainer: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  sliderLabel: {
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3rem',
    },
    marginTop: 40,
    marginBottom: -20,
  },
  slider: {
    marginTop: 40,
    marginBottom: 40,
  },
  sliderMark: {
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },
  sketchContainer: {
    padding: 20,
  },
  part0: {
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3rem',
    },
  },
  part1: {},
  part2: {
    fontWeight: 'bold',
  },
  gridImageItem: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 500,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  gridImageItemTitle: {
    padding: '2px 10px',
    fontSize: '1.2rem',
    color: '#fbfbfbc3',
    backgroundColor: '#2b2b2b9d',
  },
  gridImageItemCaption: {
    padding: '2px 10px',
    fontSize: '1.2rem',
    color: '#fbfbfbc3',
    backgroundColor: '#2b2b2b9d',
    textAlign: 'right',
  },
  buttonGroup: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 8,
    paddingRight: 30,
    paddingLeft: 30,
    minWidth: 100,
    [theme.breakpoints.up('sm')]: {
      minWidth: 180,
    },
  },
})

// hook for tracking the previous value of a stateful variable
const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const WaterCoolerPage = (props) => {
  const classes = useStyles()
  const { locations, characters } = parseData(props.data)
  const [step, setStep] = useState(0)
  const prevStep = usePrevious(step)
  const [name, setName] = useState('')
  const [christian, setChristian] = useState(0)
  const [science, setScience] = useState(0)
  const [sketch, setSketch] = useState({ part1: '', part2: '', character: null })

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const directionForStepIndex = (stepIndex) => {
    return (step === stepIndex && prevStep === stepIndex - 1) ||
      prevStep === undefined ||
      (step === stepIndex - 1 && prevStep === stepIndex)
      ? 'left'
      : 'right'
  }

  const handleChristianChange = (e, value) => {
    setChristian(value)
  }

  const handleScienceChange = (e, value) => {
    setScience(value)
  }

  const handleReset = () => {
    setName('')
    setSketch({ part1: '', part2: '', character: null })
    setChristian(0)
    setScience(0)
    setStep(0)
  }

  const handleBack = () => {
    if (step === 0) {
      return
    }
    setStep(step - 1)
  }

  const handleNext = () => {
    if (step < 1) {
      const sketch = getSketch(name, christian, science, locations, characters)
      setSketch(sketch)
      setStep(step + 1)
      return
    }
    handleReset()
  }

  const sketchFor = (character) => {
    if (!character) {
      return ''
    }
    return (
      <div
        className={classes.gridImageItem}
        style={{
          backgroundImage: `url(${images[character.Index].sketch})`,
          backgroundSize: 'cover',
        }}
      >
        <Typography className={classes.gridImageItemTitle}>{character.Character}</Typography>
        <a
          style={{ textDecoration: 'none' }}
          href='https://www.instagram.com/inthekevinwoods/'
          target='_blank'
          rel='noreferrer'
        >
          <Typography className={classes.gridImageItemCaption}>
            art by <strong>kevin woods</strong>
          </Typography>
        </a>
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Studio60.me</title>
        <meta property='og:title' content='Studio60.me' />
        <meta property='og:description' content='Studio 60 water cooler sketch generator' />
        <meta property='og:image' content={`https://studio60.me${icon}`} />
        <meta property='og:url' content='https://studio60.me' />
        <meta name='twitter:title' content='Studio60.me' />
        <meta name='twitter:description' content='Studio 60 water cooler sketch generator' />
        <meta name='twitter:image' content={`https://studio60.me${icon}`} />
        <meta name='twitter:card' content='summary' />
      </Helmet>
      <CssBaseline />
      <div style={{ overflow: 'hidden' }}>
        <Header showQuote={false} />
        <Typography variant='body2' align='center' className={classes.subtitle}>
          Water Cooler Sketch Generator
        </Typography>
        <Grid
          className={classes.transitionContainer}
          item
          container
          direction='column'
          justify='center'
          alignItems='center'
          xs={12}
        >
          <Slide
            key='name'
            className={classes.slideContainer}
            direction={directionForStepIndex(0)}
            in={step === 0}
            timeout={!prevStep && step === 0 ? 0 : duration.standard}
            mountOnEnter
            unmountOnExit
            exit={false}
          >
            <Grid
              className={classes.inputContainer}
              container
              direction='row'
              justify='center'
              alignItems='center'
              item
              xs={10}
              sm={8}
              md={6}
              lg={5}
            >
              <TextField
                className={classes.textInput}
                fullWidth
                color='primary'
                type='text'
                variant='outlined'
                placeholder='Your name'
                value={name}
                onChange={handleNameChange}
              />
              <Typography className={classes.sliderLabel} variant='body2' color='primary'>
                How &ldquo;Crazy Christians&rdquo; are you?
              </Typography>

              <Slider
                className={classes.slider}
                classes={{ markLabel: classes.sliderMark }}
                defaultValue={0}
                step={1}
                marks={[
                  { value: 0, label: '' },
                  { value: 1, label: '✞' },
                  { value: 2, label: '✞😜' },
                  { value: 3, label: '✞😜👼' },
                  { value: 4, label: '✞😜👼😝' },
                ]}
                min={0}
                max={4}
                value={christian}
                onChange={handleChristianChange}
              />

              <Typography className={classes.sliderLabel} variant='body2' color='primary'>
                How &ldquo;Science Schmience&rdquo; are you?
              </Typography>
              <Slider
                className={classes.slider}
                classes={{ markLabel: classes.sliderMark }}
                defaultValue={0}
                step={1}
                marks={[
                  { value: 0, label: '' },
                  { value: 1, label: '👩‍🔬' },
                  { value: 2, label: '👩‍🔬🔬' },
                  { value: 3, label: '👩‍🔬🔬🧪' },
                  { value: 4, label: '👩‍🔬🔬🧪🧬' },
                ]}
                min={0}
                max={4}
                value={science}
                onChange={handleScienceChange}
              />
            </Grid>
          </Slide>
          <Slide
            key='answer'
            className={classes.slideContainer}
            direction={directionForStepIndex(1)}
            in={step === 1}
            mountOnEnter
            unmountOnExit
            exit={false}
          >
            <Grid container direction='row' justify='center' alignItems='center'>
              <Grid
                className={classes.sketchContainer}
                container
                item
                direction='column'
                justify='center'
                alignItems='center'
                xs={12}
                sm={6}
              >
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                  <Typography className={classes.part0} variant='body2'>
                    Your Studio 60 sketch is:
                  </Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Typography variant='h6' display='inline' className={classes.part1}>
                    {sketch && sketch.part1}
                  </Typography>
                  ...
                  <br />
                  <Typography variant='h6' display='inline' className={classes.part2}>
                    {sketch && sketch.part2}
                  </Typography>
                </div>
              </Grid>
              <Grid
                className={classes.sketchContainer}
                container
                item
                direction='column'
                justify='center'
                alignItems='center'
                xs={12}
                sm={6}
              >
                {sketch && sketchFor(sketch.character)}
              </Grid>
            </Grid>
          </Slide>
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
          {step > 0 && (
            <Button
              className={classes.button}
              color='secondary'
              variant='contained'
              size='small'
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          <Button
            className={classes.button}
            color='secondary'
            variant='contained'
            size='small'
            disabled={step === 0 && !name}
            onClick={handleNext}
          >
            {step === 1 ? 'Start over' : 'Next'}
          </Button>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default WaterCoolerPage

export const query = graphql`
  query WaterCoolerPage {
    allCharactersCsv {
      edges {
        node {
          Index
          Character
          Played_By
          Responsibility
          Quotes
          Tagline
          Answer_1
          Answer_2
          Answer_3
          Answer_4
          Answer_5
          Answer_6
        }
      }
    }
    allQuestionsCsv {
      edges {
        node {
          Question
          Answer_1
          Answer_2
          Answer_3
          Answer_4
          Answer_5
          Answer_6
        }
      }
    }
    allLocationsCsv {
      edges {
        node {
          Location
        }
      }
    }
  }
`
