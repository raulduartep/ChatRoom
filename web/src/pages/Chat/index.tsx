import React, { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

interface ChatParams {
  user: string;
}


const Chat: React.FC = () => {

  const { user: userParam } = useParams<ChatParams>()

  const { messages, sendMessage, users } = useChat(userParam);
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

    sendMessage(
      {
        author: userParam,
        text: input,
      },
    );
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
            users.map(user => (
              <li>{user}</li>
            ))
          }
        </UsersList>
      </UsersContainer>
      <MessagesList>
        {
          messages.map(message => (
            <MessageContainer owner={userParam === message.author}>
              <MessageContent>
                {
                  userParam !== message.author && (
                    <header>
                      <p>{message.author}</p>
                    </header>
                  )
                }
                <main>
                  <p>{message.text}</p>
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