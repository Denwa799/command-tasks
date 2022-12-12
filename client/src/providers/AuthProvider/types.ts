import {IUser} from 'models/IUser';
import {ReactNode} from 'react';

export interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
  emailActivationIsLoading: boolean;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<string | undefined>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  emailActivation: (email: string, code: number) => Promise<string | undefined>;
}

export interface IAuthProvider {
  children: ReactNode;
}
