import { Problem } from 'src/problem/entities/problem.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../roles/role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Problem, (problem) => problem.user)
  problems: Problem[];

  @Column({ type: 'enum', enum: Role, default: [Role.User] })
  role: Role;
}
