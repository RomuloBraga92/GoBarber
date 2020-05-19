import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticatedUser = container.resolve(AuthenticationUserService);

    const { user, token } = await authenticatedUser.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}
