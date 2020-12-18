import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Content } from './styles';

const Login: React.FC = () => {

  const history = useHistory()

  const [username, setUsername] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    history.push(`/chat/${username}`)

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
