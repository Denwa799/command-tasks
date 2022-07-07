import axios from 'axios';
import {ILoginResponse} from 'models/IAuth';

export const LoginService = (api: string, email: string, password: string) => {
  return axios.post<ILoginResponse>(api, {
    email: email,
    password: password,
  });
};