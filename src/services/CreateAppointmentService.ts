import {getCustomRepository} from 'typeorm';
import {startOfHour} from 'date-fns';

import Appointment from  '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';


/**
 * Recebimento das informações
 * Tratativa de erros
 */

interface Request{
    provider_id: string,
    date: Date
}

//Inversão de dependencia
// O service deve ter apenas um método que é a sua [unica] responsabilidade
class CreateAppointmentService{


    public async execute({date, provider_id}: Request): Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }

}

export default CreateAppointmentService;
