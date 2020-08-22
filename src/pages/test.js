import 'typeface-montserrat'
import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { CssBaseline, Grid, Typography } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Header from '../components/header'
import theme from '../components/theme'
import icon from '../images/icon.png'
import '../index.css'

const useStyles = makeStyles({
  spacer: {
    margin: '20px 0',
  },
  mainLink: {
    fontWeight: 'bold',
    margin: '12px 0',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  linkGroup: {
    marginTop: 60,
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
    margin: '0 6px',
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
          <Link className={classes.mainLink} to='/water-cooler'>
            Water cooler
          </Link>
          <Link className={classes.mainLink} to='/personality-quiz'>
            Personality quiz
          </Link>
          <Link className={classes.mainLink} to='/timer'>
            Timeclock
          </Link>
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
            Past show name generators:
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
