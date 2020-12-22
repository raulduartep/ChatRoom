import React, { FormEvent, KeyboardEvent, useState } from 'react';


import useChat from '../../hooks/useChat';

import {
  Container,
  UsersList,
  UsersContainer,
  MessagesList,
  MessageContainer,
  MessageContent,
  UserInputForm
} from './styles';

const Chat: React.FC = () => {

  const { messages, sendMessage, users } = useChat();
  const [input, setInput] = useState('');

  const username = localStorage.getItem('@ChatRoom:username');

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

    sendMessage(input);
    setInput('');
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
            users.map((user, index) => (
              <li key={index} >{user.username}</li>
            ))
          }
        </UsersList>
      </UsersContainer>
      <MessagesList>
        {
          messages.map((message, index) => (
            <MessageContainer key={index} owner={username === message.signature}>
              <MessageContent>
                {
                  username !== message.signature && (
                    <header>
                      <p>{message.signature}</p>
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