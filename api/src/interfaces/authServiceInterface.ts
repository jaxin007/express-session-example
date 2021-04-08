import {
  InsertResult,
} from 'typeorm';

import {
  SessionIds,
  User,
} from '../entities';

import {
  RegisterUserModel,
} from '../models';

export interface AuthServiceInterface {
  assignSessionIdToUser(userId: number, sessionId: string): Promise<InsertResult>,

  findUser(userId?: number): Promise<User>,

  findUserByLogin(login: string, findOrFail?: boolean): Promise<User | undefined>,

  registerUser(userData: RegisterUserModel): Promise<InsertResult>,

  terminateAllOtherSessions(userId: number, currentSessionId: string): Promise<SessionIds[]>,
}
