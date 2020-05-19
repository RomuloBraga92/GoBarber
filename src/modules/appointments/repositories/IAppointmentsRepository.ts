import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '../dtos/ICreateAppointmentsDTO';
import IFindInAllMonthFromProviderDTO from '../dtos/IFindInAllMonthFromProviderDTO';
import IFindInAllDayFromProviderDTO from '../dtos/IFindinAllDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindInAllMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindInAllDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
