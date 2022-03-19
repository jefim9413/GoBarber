import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import upload from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAtavarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFIleExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFIleExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAtavarService;
