export interface IUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  email: string;
  name: string;
  cpf: string;
  password: string;
  cellphone: string;
}

export interface IUserAccount {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
  password: string;
  accountBalance: number;
  accountNumber: string;
}
