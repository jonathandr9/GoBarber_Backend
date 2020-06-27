import {Router, response} from 'express';
import {startOfHour, parseISO} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'


const appointmentsRouter = Router();


//SoC: Separation of Concerns (Separação de preocupações)
//Rota deve apenas receber a requisição, chamar outro arquivo e devolver uma resposta


appointmentsRouter.get('/', async (request, response) => {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});


appointmentsRouter.post('/', async (request, response) =>{

    try{


        const {provider, date} = request.body;//recebe os dados da requisição

        const parsedDate = parseISO(date);// transforma os dados da requisição(é transformação de dados e não regra de negócio)

        const appointmentsRepository = new CreateAppointmentService();

        const appointment = await appointmentsRepository.execute({provider, date: parsedDate}); //executa o service

        return response.json(appointment); //retorna a resposta

        //conforme visto acima, uma rota deve apenas receber uma requisição, chamar uma classe para executar e devolver a resposta

    }catch(err){
        return response.json({error: err.message});
    }


});

export default appointmentsRouter;
