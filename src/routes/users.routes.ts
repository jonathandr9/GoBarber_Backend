import {Router} from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);



//Não foi incluido o middleware de autenticação para este endpoint por que ele é criação de usuário
// E não faz sentido ter de estar logado para criar o usuário
usersRouter.post('/', async (request, response) =>{

    try{

        const {name, email, password} = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        delete user.password;

        return response.json(user);

    }catch(err){
        return response.status(400).json({error: err.message});
    }


});


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request, response) => {

    console.log(request.file);

    return response.json({ok: true});
});

export default usersRouter;
 