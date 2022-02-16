import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repository/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parserDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate =
    appointmentsRepository.findByDate(parserDate);

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'this appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parserDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
