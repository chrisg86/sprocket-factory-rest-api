import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SprocketFactory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  factory_id: number;

  @Column()
  production_actual: number;

  @Column()
  production_goal: number;

  @Column()
  timestamp: number;
}
