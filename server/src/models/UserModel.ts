import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn,
} from 'typeorm';

import Message from './MessageModel';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Message, (message) => message.owner, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'owner_id' })
  messages: Message[]
}
