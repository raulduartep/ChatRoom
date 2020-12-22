import React, { FormEvent, useContext, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Container, Content } from './styles';

import AuthContext from '../../contexts/auth';

const Login: React.FC = () => {
  
  const location = useLocation()

  const { from } = location.state as any || { from: { pathname: '/chat' } }

  const { signed, signIn } = useContext(AuthContext);

  const [username, setUsername] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await signIn(username)

    } catch (error) {
      console.log(error)
    }

  }

  if(signed) {
    return <Redirect to={from} />
  }

  return (
    <Container>
      <Content>
        <header>
          <h1>ChatRoom</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='username'
            required
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </Content>
    </Container>
  );
};

export default Login;
