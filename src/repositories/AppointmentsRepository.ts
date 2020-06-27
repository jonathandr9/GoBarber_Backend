import {EntityRepository, Repository} from 'typeorm';

import Appointment from '../models/Appointment';


@EntityRepository(Appointment)
class AppointmentsRespository extends Repository<Appointments>{ 

  
    public async findByDate(date: Date): Promise<Appointment | null>{        

        const findAppointment = await this.findOne({
            where: {date},
        })



        return findAppointment || null;
    }
   

}


export default AppointmentsRespository;
