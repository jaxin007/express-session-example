import {
  UserRoles,
} from '../constants';

export interface RegisterUserModel {
  email?: string,
  login: string,
  password: string,
}

export interface LoginUserModel {
  id: number,
  role: UserRoles,
}
