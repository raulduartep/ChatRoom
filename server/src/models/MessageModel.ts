import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('messages')
export default class Images {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  message: string;

  @Column()
  signature: string;
}
