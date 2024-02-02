import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import Contact from "./Contact.entity";

@Entity("clients")
export default class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ length: 120 })
  telephone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @DeleteDateColumn({ name: "deletedAt", type: "date", nullable: true })
  deletedAt: string | null;

  @OneToMany(() => Contact, (contact) => contact.client, {
    onDelete: "CASCADE",
  })
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);

    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
