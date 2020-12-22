import { useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import AuthContext from '../contexts/auth';

interface Message {
  message: string;
  signature: string;
}

interface User {
  username: string
}

interface GetChatResponse {
  messages: Message[];
  users: User[]
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([])
  const socketRef = useRef<Socket>();

  const token = localStorage.getItem('@ChatRoom:token');

  const { api } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const { data: { users, messages } } = await api.get<GetChatResponse>('/chat');

      setMessages(messages)
      setUsers(users)
    })()
  }, [api])

  useEffect(() => {
    socketRef.current = io('http://localhost:3333', {
      query: {
        token
      }
    });

    socketRef.current.on('new_user', (user: User) => {
      setUsers((values) => [...values, user])
    })

    socketRef.current.on('user_disconnect', (user: User) => {
      setUsers((values) => values.filter((value) => value.username !== user.username))
    })

    socketRef.current.on('new_message', (message: Message) => {
      setMessages((values) => [...values, message])
    })

    return () => {
      socketRef.current?.disconnect();
    }

  }, [token])

  const sendMessage = (message: string) => {
    socketRef.current?.emit('send_message', message)
  }

  return { messages, sendMessage, users }

}

export default useChat;