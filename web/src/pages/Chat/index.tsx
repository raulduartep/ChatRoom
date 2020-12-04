import React, { FormEvent, KeyboardEvent, useState } from 'react';

import {
  Container,
  UsersList,
  UsersContainer,
  MessagesList,
  MessageContainer,
  MessageContent,
  UserInputForm
} from './styles';

interface Message {
  author: string;
  message: string;
}

const Chat: React.FC = () => {

  const username = localStorage.getItem('ChatRoom@username');

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [input, setInput] = useState('');

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit()
    }
  }

  function handleSubmit(event?: FormEvent) {
    if (event) {
      event.preventDefault()
    }

    if (username) {
      setMessages([
        ...messages,
        {
          author: username,
          message: input,
        },
      ]);
      setInput('');
    }
  }

  return (
    <Container>
      <UsersContainer>
        <header>
          <h2>
            Online Users
          </h2>
        </header>
        <UsersList>
          {
            users.map(user => (
              <li>{user}</li>
            ))
          }
        </UsersList>
      </UsersContainer>
      <MessagesList>
        {
          messages.map(message => (
            <MessageContainer owner={username === message.author}>
              <MessageContent>
                {
                  username !== message.author && (
                    <header>
                      <p>{message.author}</p>
                    </header>
                  )
                }
                <main>
                  <p>{message.message}</p>
                </main>
              </MessageContent>
            </MessageContainer>
          ))
        }
      </MessagesList>
      <UserInputForm onSubmit={handleSubmit}>
        <textarea
          name="message"
          onKeyDown={handleKeyDown}
          value={input}
          onChange={event => setInput(event.target.value)}
        />
        <button type='submit'>Send</button>
      </UserInputForm>
    </Container>
  );
}

export default Chat;