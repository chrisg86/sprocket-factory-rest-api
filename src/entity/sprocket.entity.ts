import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sprocket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teeth: number;

  @Column()
  pitch_diameter: number;

  @Column()
  outside_diameter: number;

  @Column()
  pitch: number;
}
