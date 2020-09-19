import 'typeface-montserrat'
import React, { useState, useEffect, useRef } from 'react'
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
import { makeStyles, ThemeProvider, duration } from '@material-ui/core/styles'
import { useQueryParam, StringParam } from 'use-query-params'
import { isEmpty } from 'lodash'
import { TwitterIcon, TwitterShareButton } from 'react-share'
import Header from '../components/header'
import theme from '../components/theme'
import icon from '../images/icon.png'
import {
  parseData,
  getStudio60Character,
  getStudio60CharacterByIndex,
  getRandomQuote,
} from '../data'
import { images } from '../images/characterImages'
import '../index.css'

const useStyles = makeStyles({
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
    paddingRight: 30,
    paddingLeft: 30,
    minWidth: 100,
    [theme.breakpoints.up('sm')]: {
      minWidth: 180,
    },
  },
  shareButton: {
    border: 'none',
    padding: 0,
    height: 56,
    margin: '0 14px',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
  gridImageItem: {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    background: 'black',
    minHeight: 500,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  gridImageItemCaption: {
    padding: '2px 10px',
    fontSize: '1.2rem',
    color: '#fbfbfbc3',
    backgroundColor: '#2b2b2b9d',
  },
  gridTextItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.main,
    textAlign: 'center',
    height: '100%',
    padding: '10px 20px',
    borderRadius: 3,
    wordBreak: 'break-word',
    hyphens: 'auto',
  },
  gridNameItem: {
    color: 'white',
    background: 'black',
  },
  gridQuoteItem: {
    fontStyle: 'italic',
    color: 'white',
    background: 'black',
  },
  quoteChar: {
    fontWeight: 'bolder',
  },
  quoteText: {
    fontWeight: 500,
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

const PersonalityQuizPage = (props) => {
  const classes = useStyles()
  const { characters, questions } = parseData(props.data)
  const [queryId, setQueryId] = useQueryParam('id', StringParam)
  const [step, setStep] = useState(0)
  const prevStep = usePrevious(step)
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState([])
  const studio60Character = getStudio60CharacterByIndex(characters, Number(queryId))

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
      const character = getStudio60Character(name, characters, questions, answers)
      setQueryId(character.Index)
      setStep(questions.length + 1)
      return
    }
    handleReset()
  }

  const handleReset = () => {
    setStep(0)
    setName('')
    setAnswers([])
    setQueryId(undefined)
  }

  const handleAnswer = (index, { target: { value } }) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const screencapImageFor = (index) => {
    if (!characters.map((c) => c.Index).includes(queryId)) {
      return ''
    }
    return (
      <div
        className={classes.gridImageItem}
        style={{
          backgroundImage: `url(${images[queryId].screencaptures[`${index}`]})`,
          backgroundSize: 'cover',
        }}
      >
        <a
          style={{ textDecoration: 'none' }}
          href='https://screenmusings.org/Studio60/'
          target='_blank'
          rel='noreferrer'
        >
          <Typography className={classes.gridImageItemCaption}>
            screencap by <strong>screenmusings.org</strong>
          </Typography>
        </a>
      </div>
    )
  }

  const sketchFor = () => {
    if (!characters.map((c) => c.Index).includes(queryId)) {
      return ''
    }
    return (
      <div
        className={classes.gridImageItem}
        style={{
          backgroundImage: `url(${images[queryId].sketch})`,
          backgroundSize: 'contain',
        }}
      >
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

  // handle navigating directly to a character
  const handleDirectNavigation = () => {
    if (!queryId) {
      return
    }
    if (!studio60Character) {
      handleReset()
      return
    }
    setStep(questions.length + 1)
  }

  useEffect(handleDirectNavigation, [])

  const description = studio60Character
    ? `Check out my Studio 60 character - ${studio60Character.Character}`
    : 'Studio 60 name generator'
  const image = studio60Character
    ? `https://studio60.me${images[queryId].sketch}`
    : `https://studio60.me${icon}`
  const url = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Studio60.me</title>
        <meta property='og:title' content='Studio60.me' />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:url' content={url} />
        <meta name='twitter:title' content='Studio60.me' />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
        <meta name='twitter:card' content='summary' />
      </Helmet>
      <CssBaseline />
      <div style={{ overflow: 'hidden', marginBottom: 20 }}>
        <Header showQuote={true} />
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
              <Typography className={classes.inputLabel} variant='body1' color='textSecondary'>
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
              >
                <Typography className={classes.inputLabel} variant='body1' color='textSecondary'>
                  {question.Question}
                </Typography>
                <RadioGroup
                  name={`question-${index}`}
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswer(index, e)}
                >
                  {question.Answer_1 && (
                    <FormControlLabel value='1' control={<Radio />} label={question.Answer_1} />
                  )}
                  {question.Answer_2 && (
                    <FormControlLabel value='2' control={<Radio />} label={question.Answer_2} />
                  )}
                  {question.Answer_3 && (
                    <FormControlLabel value='3' control={<Radio />} label={question.Answer_3} />
                  )}
                  {question.Answer_4 && (
                    <FormControlLabel value='4' control={<Radio />} label={question.Answer_4} />
                  )}
                  {question.Answer_5 && (
                    <FormControlLabel value='5' control={<Radio />} label={question.Answer_5} />
                  )}
                  {question.Answer_6 && (
                    <FormControlLabel value='6' control={<Radio />} label={question.Answer_6} />
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
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={12} sm={12} md={4}>
                <div className={`${classes.gridTextItem} ${classes.gridNameItem}`}>
                  <Typography variant='body2'>Your Studio 60 name is</Typography>
                  <Typography variant='h4' style={{ fontWeight: 'bold' }}>
                    {studio60Character && studio60Character.Character}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={8}>
                {sketchFor()}
              </Grid>
              <Grid item xs={12} md={8} xl={3}>
                {screencapImageFor(1)}
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <div className={classes.gridTextItem}>
                  <Typography variant='body1'>
                    {studio60Character && studio60Character.Tagline}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <div className={`${classes.gridTextItem} ${classes.gridQuoteItem}`}>
                  <Typography variant='body1'>
                    <span className={classes.quoteChar}>&ldquo;</span>
                    <span className={classes.quoteText}>{getRandomQuote(studio60Character)}</span>
                    <span className={classes.quoteChar}>&rdquo;</span>
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={8} xl={3}>
                {screencapImageFor(2)}
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
          {(!isEmpty(answers) || name) && step > 0 && (
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
            {step === questions.length + 1 ? 'Start over' : 'Next'}
          </Button>
          {step === questions.length + 1 && studio60Character && (
            <TwitterShareButton
              className={classes.shareButton}
              url={url}
              title={`Check out my Studio 60 character - ${studio60Character.Character}`}
              resetButtonStyle={false}
            >
              <TwitterIcon borderRadius={4} size={54} />
            </TwitterShareButton>
          )}
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default PersonalityQuizPage

export const query = graphql`
  query PersonalityQuizPage {
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
