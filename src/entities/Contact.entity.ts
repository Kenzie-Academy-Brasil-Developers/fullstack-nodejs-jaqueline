import Client from "./Client.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('contacts')
export default class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 120 })
  name: string

  @Column({ length: 45 })
  email: string

  @Column({ length: 20 })
  telephone: string

  @CreateDateColumn({ type: 'date' })
  createdAt: string

  @DeleteDateColumn({name: 'deletedAt', type: 'date', nullable: true })
  deletedAt: string | null

  @ManyToOne(() => Client, (client) => client.contacts, {
    onDelete: "CASCADE",
  }) 
  client: Client

  @Column()
  clientId: string
}