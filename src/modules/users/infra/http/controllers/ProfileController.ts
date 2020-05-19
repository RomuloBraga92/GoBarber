import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({
      user_id,
    });

    delete user.password;

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const { name, email, old_password, password } = req.body;

      const updatedUser = container.resolve(UpdateProfileService);

      const user = await updatedUser.execute({
        user_id,
        name,
        email,
        old_password,
        password,
      });

      delete user.password;

      return res.json(classToClass(user));
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
