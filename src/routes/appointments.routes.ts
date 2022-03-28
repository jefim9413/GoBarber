import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repository/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAutjenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAutjenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parserDate = parseISO(date);
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parserDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default appointmentsRouter;
