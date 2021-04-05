import {
  InsertResult,
} from 'typeorm';

import {
  User,
} from '../entities';

import {
  RegisterUserModel,
} from '../models';

export interface AuthServiceInterface {
  assignSessionIdToUser(userId: number, sessionId: string): Promise<InsertResult>,

  findUser(userId?: number): Promise<User>,

  findUserByLogin(login: string): Promise<User>,

  registerUser(userData: RegisterUserModel): Promise<InsertResult>,
}
