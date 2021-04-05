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

  async findUserByLogin(login: string): Promise<User> {
    const findQueryString = 'users.login = :login';

    return this.usersRepository.createQueryBuilder('users')
      .where(findQueryString, {
        login,
      })
      .getOneOrFail();
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
}
