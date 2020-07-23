import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({}, '00236eb37a87f3db44fd472ac320a29b', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
