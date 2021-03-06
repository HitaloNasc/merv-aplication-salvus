import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import ImgAdmin from '../../../assets/img/salvus.svg'
import MenuAdmin from '../../../components/menu-professional'
import Footer from '../../../components/footer-admin'



const useStyles = makeStyles((theme) => ({
  titleH2: {
    color: theme.palette.success.dark,
    fontWeight: 600,
    fontSize: 30
  },
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  logo: {
    height: "55vh",
    marginTop: "10vh",
    marginBottom: "10vh",
  }
}))

export default function DashProfessional() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <MenuAdmin nameMenu="DASHBOARD" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item align="center" xs={12} sm={12} className={classes.logo} >
              <img
                height="100%"
                width="100%"
                src={ImgAdmin}
                alt="logo-salvus" />
                <h2 className={classes.titleH2}>PROFISSIONAL</h2>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  )
}