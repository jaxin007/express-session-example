import {
  getConnection,
  InsertResult,
  Repository,
} from 'typeorm';

import {
  injectable,
} from 'inversify';
import {
  SessionIds,
  User,
} from '../entities';
import {
  EntityNames,
} from '../constants';

import {
  RegisterUserModel,
} from '../models';
import {
  AuthServiceInterface,
} from '../interfaces';

@injectable()
export class AuthService implements AuthServiceInterface {
  private readonly usersRepository: Repository<User>;

  private readonly sessionIdsRepository: Repository<SessionIds>;

  constructor() {
    this.usersRepository = getConnection().getRepository<User>(EntityNames.users);
    this.sessionIdsRepository = getConnection().getRepository<SessionIds>(EntityNames.sessionIds);
  }

  async registerUser(userData: RegisterUserModel): Promise<InsertResult> {
    return this.usersRepository.createQueryBuilder()
      .insert()
      .into(User)
      .values(userData)
      .execute();
  }

  async findUser(userId: number): Promise<User> {
    const findQueryString = 'users.id = :userId';

    return this.usersRepository.createQueryBuilder('users')
      .where(findQueryString, {
        userId,
      })
      .getOneOrFail();
  }

  async findUserByLogin(login: string, findOrFail = false): Promise<User | undefined> {
    const user = await this.usersRepository.createQueryBuilder('users')
      .where('users.login = :login', {
        login,
      });

    return findOrFail ? user.getOneOrFail() : user.getOne();
  }

  async assignSessionIdToUser(userId: number, sessionId: string): Promise<InsertResult> {
    const user = await this.findUser(userId);

    return this.sessionIdsRepository.createQueryBuilder()
      .insert()
      .into(SessionIds)
      .values({
        user,
        sessionId,
      })
      .execute();
  }

  async terminateAllOtherSessions(userId: number, currentSessionId: string): Promise<SessionIds[]> {
    const sessions = await this.sessionIdsRepository
      .createQueryBuilder('sessionIds')
      .where('sessionIds.userId = :userId', {
        userId,
      })
      .where('sessionIds.sessionId != :currentSessionId', {
        currentSessionId,
      })
      .select('sessionIds.sessionId')
      .getMany();

    await this.sessionIdsRepository
      .createQueryBuilder('sessionIds')
      .where('sessionIds.userId = :userId', {
        userId,
      })
      .where('sessionIds.sessionId != :currentSessionId', {
        currentSessionId,
      })
      .delete();

    return sessions;
  }
}
