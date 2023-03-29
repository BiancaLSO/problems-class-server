import { Problem } from 'src/problem/entities/problem.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Role } from '../roles/role.enum';
import { TenantEntity } from './tenant';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne((type) => TenantEntity, (tenant) => tenant.user)
  tenant: TenantEntity | null;

  @OneToMany(() => Problem, (problem) => problem.user)
  problems: Problem[];

  @Column({ type: 'enum', enum: Role, default: [Role.User] })
  role: Role;
}
