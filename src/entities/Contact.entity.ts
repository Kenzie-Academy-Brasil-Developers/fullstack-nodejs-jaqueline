import Client from "./Client.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('contacts')
export default class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 120 })
  name: string

  @Column({ length: 45, unique: true })
  email: string

  @Column({ length: 20 })
  telephone: string

  @CreateDateColumn({ type: 'date' })
  createdAt: string

  @ManyToOne(() => Client, client => client.contacts) 
  client: Client
}