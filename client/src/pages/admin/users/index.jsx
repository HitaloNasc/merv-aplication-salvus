import React, { useState, useEffect } from 'react'
import MenuAdmin from '../../../components/menu-admin'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Footer from '../../../components/footer-admin'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import api from '../../../services/api'
import { Button, ButtonGroup, Chip } from '@material-ui/core'
import Bar from '../../../components/Bar'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontFamily: 'Arial'
  },
  table: {
    minWidth: 650,
    whiteSpace: 'nowrap'
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
  admin: {
    backgroundColor: theme.palette.success.dark
  },
  professional: {
    backgroundColor: theme.palette.secondary.dark
  },
  buttonUpdate: {
    borderColor: theme.palette.success.dark
  },
  buttonDelete: {
    borderColor: theme.palette.secondary.dark
  },
  paperR: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  titleH2: {
    color: theme.palette.success.dark,
    fontWeight: 600
  },
  count: {
    color: theme.palette.success.main,
    fontSize: 40,
    margin: 0,
  }
}))

export default function ListUser() {
  const classes = useStyles()
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/api/users')
      setUsers(response.data)
    }
    loadUsers()
  }, [])

  const professionals = users.filter((user) => user.userType == 2)

  const admin = users.filter(user => user.userType == 1)

  function typeUser(params) {
    if (params === 1) {
      return <Chip label="Administrador" color="primary" className={classes.admin} />
    } else {
      return <Chip label="Profissional" color="secondary" className={classes.professional} />
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluir este usu??rio?")) {
      var result = await api.delete('api/users/' + id)
      if (result.status === 200) {
        window.location.href = '/admin/users'
      } else {
        alert('Ocorreu um erro, tente novamente.')
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin nameMenu="USU??RIOS" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <Paper className={classes.paperR}>
                <h2 className={classes.titleH2}>Total de administradores</h2>
                <p className={classes.count}>{admin.length}</p>
              </Paper>
              </Grid>
            <Grid item sm={6}>
        
              <Paper className={classes.paperR}>
                <h2 className={classes.titleH2}>Total de profissionais</h2>
                <p className={classes.count}>{professionals.length}</p>
              </Paper>
            </Grid>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2 align="center" className={classes.titleH2}>Lista de Usu??rios</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">E-mail</TableCell>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">Telefone</TableCell>
                            <TableCell align="center">G??nero</TableCell>
                            <TableCell align="center">CPF</TableCell>
                            <TableCell align="center">Profiss??o</TableCell>
                            <TableCell align="center">Registro</TableCell>
                            <TableCell align="center">Ocupa????o Prim??ria</TableCell>
                            <TableCell align="center">Ocupa????o Secund??ria</TableCell>
                            <TableCell align="center">R??dio de Opera????o (km)</TableCell>
                            <TableCell align="center">Data de Nascimento</TableCell>
                            <TableCell align="center">Data de Cadastro</TableCell>
                            <TableCell align="center">Op????es</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.username}
                              </TableCell>
                              <TableCell align='center'>{row.email}</TableCell>
                              <TableCell align='center'>{typeUser(row.userType)}</TableCell>
                              <TableCell align='center'>{row.tel}</TableCell>
                              <TableCell align='center'>{row.gender}</TableCell>
                              <TableCell align='center'>{row.cpf}</TableCell>
                              <TableCell align='center'>{row.profession}</TableCell>
                              <TableCell align='center'>{row.registration}</TableCell>
                              <TableCell align='center'>{row.primaryOccupation}</TableCell>
                              <TableCell align='center'>{row.secondaryOccupation}</TableCell>
                              <TableCell align='center'>{row.range}</TableCell>
                              <TableCell align='center'>{new Date(row.birth).toLocaleDateString('pt-br')}</TableCell>
                              <TableCell align='center'>{new Date(row.createdAt).toLocaleDateString('pt-br')}</TableCell>
                              <TableCell size='small' align="center">
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button className={classes.buttonUpdate} href={'/admin/users/update/' + row._id}>Editar</Button>
                                  <Button className={classes.buttonDelete} onClick={() => handleDelete(row._id)}>Excluir</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Grid>
                </Grid>
              </Paper>
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