import {ReactNode} from 'react';

export interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  children: ReactNode;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  access_token: string;
  refresh_token: string;
}
