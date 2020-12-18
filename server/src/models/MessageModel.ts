import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import User from './UserModel';

@Entity('messages')
export default class Images {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  message: string;

  @Column()
  signature: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
