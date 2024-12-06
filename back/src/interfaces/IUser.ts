export interface IUser {
  id: number;
  mail: string;
  name: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
