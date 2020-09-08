import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
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
    color: theme.palette.primary.main,
    fontFamily: 'Fontopo',
    marginLeft: -4,
    [theme.breakpoints.only('xs')]: {
      fontSize: '3rem',
    },
  },
  title3Font: {
    color: theme.palette.primary.main,
    marginTop: '7%',
    fontWeight: 600,
    marginRight: 20,
    marginLeft: -8,
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.7rem',
      marginTop: '5%',
      marginLeft: 0,
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
})

const Header = (props) => {
  const { classes, showQuote } = props

  return (
    <Grid
      className={classes.headerContainer}
      container
      direction='column'
      justify='center'
      alignItems='center'
    >
      <Grid className={classes.titleContainer}>
        <a href='/' className={classes.titleLink}>
          <Grid className={classes.title} container direction='row' alignItems='center'>
            <div className={classes.title1Container}>
              <Typography className={classes.title1Font} variant='h2' align='center'>
                STUDIO
              </Typography>
            </div>
            <Typography className={classes.title2Font} variant='h2' align='center'>
              6O
            </Typography>
            <Typography className={classes.title3Font} variant='h4' align='center'>
              .me
            </Typography>
          </Grid>
        </a>
      </Grid>
      {showQuote && (
        <Grid className={classes.subtitleContainer}>
          <div>
            <Typography className={classes.subtitleFont} variant='body2' color='textSecondary'>
              &ldquo;What's in a name? It's all in the name.&rdquo;
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
      )}
    </Grid>
  )
}

Header.propTypes = {
  showQuote: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Header)
