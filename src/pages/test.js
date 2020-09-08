import 'typeface-montserrat'
import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { CssBaseline, Grid, Typography } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Header from '../components/header'
import theme from '../components/theme'
import icon from '../images/icon.png'
import personalityQuizImage from '../images/personality-quiz.jpg'
import timeclockImage from '../images/timeclock.jpg'
import waterCoolerImage from '../images/water-cooler.jpg'
import '../index.css'

const useStyles = makeStyles({
  spacer: {
    margin: '10px 0',
  },
  mainImage: {
    display: 'flex',
    minHeight: 200,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 3,
  },
  mainImageOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: fade(theme.palette.primary.main, 0.7),
    padding: 10,
    borderRadius: 3,
    '&:hover': {
      background: fade(theme.palette.primary.main, 0.5),
    },
  },
  mainLink: {
    position: 'relative',
    margin: '12px 0',
    height: '100%',
    width: '100%',
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  mainLinkFont: {
    fontWeight: 'bold',
  },
  linkGroup: {
    marginTop: 20,
    marginBottom: 30,
  },
  linkFont: {
    fontSize: 10,
    [theme.breakpoints.up('sm')]: {
      fontSize: 12,
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  span: {
    marginLeft: 6,
  },
})

const IndexPage = () => {
  const classes = useStyles()

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
        <Grid container direction='column' justify='center' alignItems='center'>
          <Header className={classes.header} showQuote={false} />
          <div className={classes.spacer} />
          <Grid container item xs={10} sm={8} md={6} lg={4}>
            <Link className={classes.mainLink} to='/water-cooler'>
              <div
                className={classes.mainImage}
                style={{ backgroundImage: `url(${waterCoolerImage})` }}
              >
                <div className={classes.mainImageOverlay}>
                  <Typography variant='h5' align='center' className={classes.mainLinkFont}>
                    Water cooler
                  </Typography>
                </div>
              </div>
            </Link>
          </Grid>
          <Grid container item xs={10} sm={8} md={6} lg={4}>
            <Link className={classes.mainLink} to='/personality-quiz'>
              <div
                className={classes.mainImage}
                style={{ backgroundImage: `url(${personalityQuizImage})` }}
              >
                <div className={classes.mainImageOverlay}>
                  <Typography variant='h5' align='center' className={classes.mainLinkFont}>
                    Personality quiz
                  </Typography>
                </div>
              </div>
            </Link>
          </Grid>
          <Grid container item xs={10} sm={8} md={6} lg={4}>
            <Link className={classes.mainLink} to='/timer'>
              <div
                className={classes.mainImage}
                style={{ backgroundImage: `url(${timeclockImage})` }}
              >
                <div className={classes.mainImageOverlay}>
                  <Typography variant='h5' align='center' className={classes.mainLinkFont}>
                    Timeclock
                  </Typography>
                </div>
              </div>
            </Link>
          </Grid>
        </Grid>
        <Grid
          className={classes.linkGroup}
          item
          xs={10}
          container
          direction='row'
          justify='flex-end'
        >
          <Typography
            className={classes.linkFont}
            variant='body1'
            color='textSecondary'
            align='right'
          >
            <span>
              Questions? Watch the{' '}
              <a className={classes.link} href='https://twitter.com/GLucasTalkShow'>
                George Lucas Talk Show
              </a>
            </span>
            <br />
            Past shows:
            <span className={classes.span}>
              <a className={classes.link} href='https://biglake.me'>
                BigLake.me
              </a>
            </span>
            <span className={classes.span}>
              <a className={classes.link} href='https://1600penn.me'>
                1600Penn.me
              </a>
            </span>
            <span className={classes.span}>
              <a className={classes.link} href='https://arliss.me'>
                Arliss.me
              </a>
            </span>
            <br />
            <span>
              <a className={classes.link} href='https://github.com/mstubna/studio60.me'>
                Source
              </a>
            </span>
          </Typography>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default IndexPage
