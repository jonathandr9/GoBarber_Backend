import {Router, response} from 'express';
import {startOfHour, parseISO} from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'


const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//SoC: Separation of Concerns (Separação de preocupações)
//Rota deve apenas receber a requisição, chamar outro arquivo e devolver uma resposta


appointmentsRouter.get('/', (request, response) => {

    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});


appointmentsRouter.post('/', (request, response) =>{

    try{
        

        const {provider, date} = request.body;//recebe os dados da requisição

        const parsedDate = parseISO(date);// transforma os dados da requisição(é transformação de dados e não regra de negócio)
    
        const createAppointment = new CreateAppointmentService(appointmentsRepository); //instancia o service com a inversão de dependencia

        const appointment = createAppointment.execute({provider, date: parsedDate}); //executa o service

        return response.json(appointment); //retorna a resposta

        //conforme visto acima, uma rota deve apenas receber uma requisição, chamar uma classe para executar e devolver a resposta

    }catch(err){
        return response.json({error: err.message});
    }


});

export default appointmentsRouter;
