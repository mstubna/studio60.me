import 'typeface-montserrat'
import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import '../index.css'
import { Helmet } from 'react-helmet'
import { CssBaseline, Grid, Typography } from '@material-ui/core'
import Header from '../components/header'
import theme from '../components/theme'
import icon from '../images/icon.png'
import '../index.css'

const useStyles = makeStyles({})

const WaterCoolerPage = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Studio60.me</title>
        <meta property='og:title' content='Studio60.me' />
        <meta property='og:description' content='Studio 60 water cooler' />
        <meta property='og:image' content={`https://studio60.me${icon}`} />
        <meta property='og:url' content='https://studio60.me' />
        <meta name='twitter:title' content='Studio60.me' />
        <meta name='twitter:description' content='Studio 60 water cooler' />
        <meta name='twitter:image' content={`https://studio60.me${icon}`} />
        <meta name='twitter:card' content='summary' />
      </Helmet>
      <CssBaseline />
      <div style={{ overflow: 'hidden' }}>
        <Header showQuote={false} />
        <Grid
          className={classes.transitionContainer}
          item
          container
          direction='column'
          justify='center'
          alignItems='center'
          xs={12}
        >
          <br />
          <Typography>Water cooler will go here</Typography>
        </Grid>
      </div>
    </ThemeProvider>
  )
}
export default WaterCoolerPage
