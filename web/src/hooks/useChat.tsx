import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  author: string;
  text: string;
}

const useChat = (username: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([])
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io('http://localhost:3333', {
      query: {
        username
      }
    });

    socketRef.current.on('setup', (usernames: string[]) => {
      setUsers(usernames)
    })

    socketRef.current.on('new_user', (username: string) => {
      setUsers((values) => [...values, username])
    })

    socketRef.current.on('user_disconnect', (username: string) => {
      setUsers((values) => values.filter((value) => value !== username))
    })

    socketRef.current.on('new_message', (message: Message) => {
      setMessages((values) => [...values, message])
    })

    return () => {
      socketRef.current?.disconnect();
    }

  }, [username])

  const sendMessage = (message: Message) => {
    socketRef.current?.emit('send_message', message)
  }

  return { messages, sendMessage, users }

}

export default useChat;