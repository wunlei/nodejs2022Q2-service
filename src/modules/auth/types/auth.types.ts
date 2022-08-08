export interface IPayload {
  userId: string;
  login: string;
}

export interface IJWT extends IPayload {
  iat: number;
  exp: number;
}
