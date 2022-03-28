import { Router } from 'express';
import multer from 'multer';
import CreateUserServices from '../services/CreateUserServices';
import ensureAutjenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAtavarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserServices();
  const user = await createUser.execute({
    name,
    email,
    password,
  });
  // delete user.password;
  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAutjenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAtavar = new UpdateUserAtavarService();
    const user = await updateUserAtavar.execute({
      user_id: request.user.id,
      avatarFilename: String(request.file?.filename),
    });
    return response.json(user);
  },
);
export default usersRouter;
