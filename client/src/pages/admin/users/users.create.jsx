import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Paper from '@material-ui/core/Paper';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    width: '100%'
  }
}));

export default function CreateUser() {
  const classes = useStyles();
  // Delcaraçãs das variáveis do formulário
  const [username, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {

    const data = { username, email, userType, password }
    if (username !== '' && email !== '' && userType !== '' && password !== '') {

      const response = await api.post('/api/users', data)
      if (response.status === 200) {
        window.location.href = '/admin/users'
      } else {
        alert('Erro ao cadastrar o usuário')
      }

    } else {
      alert('Por favor, preencha todos os dados!')
    }
  }


  return (
    <div className={classes.root}>
      <MenuAdmin nameMenu="USUÁRIOS" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item sm={12}>
            <Paper className={classes.paper}>

              <h2>Cadastro de Usuário</h2>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nome completo"
                    fullWidth
                    autoComplete="name"
                    value={username}
                    onChange={e => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="emal"
                    label="E-mail"
                    fullWidth
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="userType-label">Tipo</InputLabel>
                    <Select
                      labelId="userType-label"
                      id="userType"
                      value={userType}
                      onChange={e => setUserType(e.target.value)}
                    >
                      <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Funcionário</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type="password"
                    required
                    id="password"
                    name="password"
                    label="Senha"
                    fullWidth
                    autoComplete="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <hr />
              <Grid item xs={12} sm={12}>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                  Salvar
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}