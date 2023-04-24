import { UserEntity } from 'src/authentication/entities/user';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => UserEntity, (user) => user.problems)
  user: UserEntity;
}
