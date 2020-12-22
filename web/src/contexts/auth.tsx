import { AxiosInstance } from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import privateApi from '../services/privateApi';
import publicApi from '../services/publicApi';

export interface AuthContextData {
  signed: boolean;
  signIn(username: string): Promise<void>;
  signOut(): void;
  api: AxiosInstance
}

interface LoginResponse {
  token: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

  const [signed, setSigned] = useState(false);

  const api = useCallback(privateApi(signOut), [])

  useEffect(() => {
    const storageToken = localStorage.getItem('@ChatRoom:token');
    const storageUsername = localStorage.getItem('@ChatRoom:username');

    if (storageToken && storageUsername) {
      setSigned(true)
    }else {
      setSigned(false)
    }
  }, [setSigned])

  async function signIn(username: string) {
    const { data: { token } } = await publicApi.post<LoginResponse>('/login', { username });

    localStorage.setItem('@ChatRoom:token', token);
    localStorage.setItem('@ChatRoom:username', username);

    setSigned(true)
  }

  function signOut() {
    localStorage.removeItem('@HappyAuth:token');
    localStorage.removeItem('@HappyAuth:username');
    setSigned(false)
  }

  return (
    <AuthContext.Provider value={{ signed, signIn, signOut, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;