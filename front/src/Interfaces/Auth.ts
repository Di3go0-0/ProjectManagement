export interface IRegister {
  "mail": string,
  "name": string,
  "password": string,
  "confirmPassword": string
}

export interface ILogin {
  "mail": string,
  "password": string
}

export interface IUser {
  "id": number,
  "mail": string,
  "name": string,
}

export interface IAuthErrors {
  message?: string;
  mail?: string;
  password?: string;
}


