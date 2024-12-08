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
