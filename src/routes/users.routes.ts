import {Router} from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';


const usersRouter = Router();
const upload = multer(uploadConfig);



//Não foi incluido o middleware de autenticação para este endpoint por que ele é criação de usuário
// E não faz sentido ter de estar logado para criar o usuário
usersRouter.post('/', async (request, response) =>{


    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password
    });

    delete user.password;

    return response.json(user);   


});


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request, response) => {

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);

});

export default usersRouter;
