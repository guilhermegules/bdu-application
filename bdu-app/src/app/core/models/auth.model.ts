export interface IAuth {
  access_token: string;
}

export interface IDecodedUser {
  email: string;
  name: string;
  sub: string;
}
