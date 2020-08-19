import 'typeface-montserrat'
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import {
  Button,
  CssBaseline,
  FormControlLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core'
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
  duration,
} from '@material-ui/core/styles'
import icon from '../images/icon.png'
import { parseData } from '../data'
import { getStudio60Character } from '../data'
import '../index.css'

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
    // text: {
    //   primary: '#fff',
    // secondary: '#bbdefb',
    // },
    action: {
      // disabledBackground: '#263238e1',
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

const useStyles = makeStyles({
  headerContainer: {
    marginTop: 20,
  },
  titleContainer: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 3,
  },
  titleLink: {
    textDecoration: 'none',
    color: 'unset',
  },
  title: {},
  title1Container: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 3,
    margin: 10,
    padding: '0 14px',
    marginRight: 6,
  },
  title1Font: {
    fontFamily: 'Neusa-Bold',
    color: 'white',
    margin: '-8px 0',
    [theme.breakpoints.only('xs')]: {
      fontSize: '3rem',
    },
  },
  title2Font: {
    fontFamily: 'Fontopo',
    [theme.breakpoints.only('xs')]: {
      fontSize: '3rem',
    },
  },
  title3Font: {
    marginTop: '7%',
    fontWeight: 600,
    marginRight: 20,
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.7rem',
    },
  },
  subtitleContainer: {
    margin: '4px 20px',
  },
  subtitleFont: {
    fontSize: '1.2rem',
  },
  subtitleAuthorFont: {
    fontSize: '0.8rem',
    textAlign: 'right',
  },
  inputContainer: {},
  inputLabel: {
    textAlign: 'center',
    marginBottom: 10,
  },
  textInput: {},
  transitionContainer: {
    minHeight: 240,
  },
  progress: {
    width: '100%',
    marginTop: 50,
  },
  slideContainer: {
    paddingTop: 40,
    paddingBottom: 40,
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

const IndexPage = (props) => {
  const { characters, questions } = parseData(props.data)
  const classes = useStyles()
  const [step, setStep] = useState(0)
  const prevStep = usePrevious(step)
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState([])
  const [studio60Character, setStudio60Character] = useState()

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

  const handleBack = () => {
    if (step === 0) {
      return
    }
    setStep(step - 1)
  }

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1)
      return
    }
    if (step === questions.length) {
      setStudio60Character(
        getStudio60Character(name, characters, questions, answers)
      )
      setStep(step + 1)
      return
    }
    handleReset()
  }

  const handleReset = () => {
    setStep(0)
    setName('')
    setAnswers([])
    setStudio60Character()
  }

  const handleAnswer = (index, { target: { value } }) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Studio60.me</title>
        <meta property='og:title' content='Studio60.me' />
        <meta property='og:description' content='Studio 60 name generator' />
        <meta property='og:image' content={`https://studio60.me${icon}`} />
        <meta property='og:url' content='https://studio60.me' />
        <meta name='twitter:title' content='Studio60.me' />
        <meta name='twitter:description' content='Studio 60 name generator' />
        <meta name='twitter:image' content={`https://studio60.me${icon}`} />
        <meta name='twitter:card' content='summary' />
      </Helmet>
      <CssBaseline />
      <div style={{ overflow: 'hidden' }}>
        <Grid
          className={classes.headerContainer}
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Grid className={classes.titleContainer}>
            <a href='/' className={classes.titleLink}>
              <Grid
                className={classes.title}
                container
                direction='row'
                alignItems='center'
              >
                <div className={classes.title1Container}>
                  <Typography
                    className={classes.title1Font}
                    variant='h2'
                    align='center'
                  >
                    STUDIO
                  </Typography>
                </div>
                <Typography
                  className={classes.title2Font}
                  variant='h2'
                  align='center'
                >
                  6O
                </Typography>
                <Typography
                  className={classes.title3Font}
                  variant='h4'
                  align='center'
                >
                  .me
                </Typography>
              </Grid>
            </a>
          </Grid>
          <Grid className={classes.subtitleContainer}>
            <div>
              <Typography
                className={classes.subtitleFont}
                variant='body2'
                color='textSecondary'
              >
                &#8220;What's in a name? It's all in the name.&#8221;
              </Typography>
              <Typography
                className={classes.subtitleAuthorFont}
                variant='body2'
                color='textSecondary'
              >
                &ndash; Eli Weinraub
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid
          className={classes.transitionContainer}
          item
          container
          direction='column'
          justify='center'
          alignItems='center'
          xs={12}
        >
          {step > 0 && step < questions.length + 1 && (
            <Grid container justify='center' item xs={10} sm={8} md={6} lg={5}>
              <LinearProgress
                className={classes.progress}
                color='secondary'
                variant='determinate'
                value={(step / questions.length) * 100}
              />
            </Grid>
          )}
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
              justify='center'
              item
              xs={10}
              sm={8}
              md={6}
              lg={5}
            >
              <Typography
                className={classes.inputLabel}
                variant='body1'
                color='textSecondary'
              >
                What's your name?
              </Typography>
              <TextField
                className={classes.textInput}
                fullWidth
                color='primary'
                type='text'
                variant='outlined'
                value={name}
                onChange={handleNameChange}
              />
            </Grid>
          </Slide>
          {questions.map((question, index) => (
            <Slide
              key={`question-${index}`}
              className={classes.slideContainer}
              direction={directionForStepIndex(index + 1)}
              in={step === index + 1}
              mountOnEnter
              unmountOnExit
              exit={false}
            >
              <Grid
                className={classes.inputContainer}
                container
                direction='column'
                alignItems='center'
                item
                xs={10}
                sm={8}
                md={6}
                lg={5}
              >
                <Typography
                  className={classes.inputLabel}
                  variant='body1'
                  color='textSecondary'
                >
                  {question.Question}
                </Typography>
                <RadioGroup
                  name={`question-${index}`}
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswer(index, e)}
                >
                  {question.Answer_1 && (
                    <FormControlLabel
                      value='1'
                      control={<Radio />}
                      label={question.Answer_1}
                    />
                  )}
                  {question.Answer_2 && (
                    <FormControlLabel
                      value='2'
                      control={<Radio />}
                      label={question.Answer_2}
                    />
                  )}
                  {question.Answer_3 && (
                    <FormControlLabel
                      value='3'
                      control={<Radio />}
                      label={question.Answer_3}
                    />
                  )}
                  {question.Answer_4 && (
                    <FormControlLabel
                      value='4'
                      control={<Radio />}
                      label={question.Answer_4}
                    />
                  )}
                  {question.Answer_5 && (
                    <FormControlLabel
                      value='5'
                      control={<Radio />}
                      label={question.Answer_5}
                    />
                  )}
                  {question.Answer_6 && (
                    <FormControlLabel
                      value='6'
                      control={<Radio />}
                      label={question.Answer_6}
                    />
                  )}
                </RadioGroup>
              </Grid>
            </Slide>
          ))}
          <Slide
            key='answer'
            className={classes.slideContainer}
            direction={directionForStepIndex(questions.length + 1)}
            in={step === questions.length + 1}
            mountOnEnter
            unmountOnExit
            exit={false}
          >
            <div>
              <div>Your Studio 60 name is...</div>
              <div>{studio60Character && studio60Character.Character}</div>
            </div>
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
          <Button
            className={classes.button}
            disabled={step === 0}
            color='secondary'
            variant='contained'
            size='small'
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            className={classes.button}
            // disabled={(step === 0 && !name) || (step === 1 && !descriptor)}
            color='secondary'
            variant='contained'
            size='small'
            onClick={handleNext}
          >
            {step === questions.length + 1 ? 'Start over' : 'Next'}
          </Button>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    allCharactersCsv {
      edges {
        node {
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
  }
`
