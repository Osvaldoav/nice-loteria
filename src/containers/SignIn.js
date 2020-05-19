import React, {useState} from 'react';
import * as firestore from '../services/firestore';
import {useHistory} from 'react-router-dom';
import { Card, Box, Typography, Divider, TextField, Button } from '@material-ui/core';

const style = {
  cardContainer: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '10px'
  },
  singInForm: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textField: {
    width: '250px',
    margin: '10px 0'
  },
  button: {
    margin: '10px 0'
  }
};

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.signIn(email, password)
    .then(() => {
      setError('');
      history.push('/admin');
    })
    .catch(() => {
      setError('Correo o contraseña invalido.')
    })
  };

  return (
    <Card style={style.cardContainer}>
      <Box>
        <Typography variant="h6" align="center">
          Para acceder ingresa tu cuenta
        </Typography>
      </Box>
      <Divider/>
      <form onSubmit={handleSubmit} style={style.singInForm}>
        <TextField
          label="Correo"
          variant="outlined"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error ? true : false}
          InputLabelProps={{
            shrink: true,
          }}
          style={style.textField}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          placeholder="contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error ? true : false}
          InputLabelProps={{
            shrink: true,
          }}
          style={style.textField}
        />
        <Typography variant="body1" style={{color: 'red'}}>{error}</Typography>
        <Button variant="contained" color="primary" size="large" style={style.button} type="submit">
          Ingresar
        </Button>
      </form>
  </Card>
  )
}

export default SignIn;