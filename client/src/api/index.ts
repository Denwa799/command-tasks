import axios from 'axios';
import {IAuthResponse} from 'models/IAuth';

export const LoginService = (api: string, email: string, password: string) => {
  return axios.post<IAuthResponse>(api, {
    email: email,
    password: password,
  });
};

export const RegistrationService = (
  api: string,
  email: string,
  password: string,
  name: string,
) => {
  return axios.post<IAuthResponse>(api, {
    email: email,
    name: name,
    password: password,
  });
};
