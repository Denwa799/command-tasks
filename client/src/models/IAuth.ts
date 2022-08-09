export interface IAuthResponse {
  id: number;
  email: string;
  name: string;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}
