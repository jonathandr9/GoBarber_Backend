import Appointment from  '../models/Appointment';
import {startOfHour} from 'date-fns';
import AppointmentsRespository from '../repositories/AppointmentsRepository';


/**
 * Recebimento das informações
 * Tratativa de erros
 */

interface Request{
    provider: string,
    date: Date
}

//Inversão de dependencia
// O service deve ter apenas um método que é a sua [unica] responsabilidade
class CreateAppointmentService{

    private appointmentsRespository: AppointmentsRespository;

    constructor(appointmentsRespository: AppointmentsRespository){
        this.appointmentsRespository = appointmentsRespository;
    }

    public execute({date, provider}: Request): Appointment{

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRespository.findByDate(appointmentDate);
    
        if(findAppointmentInSameDate){
            throw Error('This appointment is already boocked');            
        }
    
        const appointment = this.appointmentsRespository.create({
            provider,
            date: appointmentDate,
        }); 

        return appointment;
    }

}

export default CreateAppointmentService;