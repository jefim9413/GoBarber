import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('aappointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
