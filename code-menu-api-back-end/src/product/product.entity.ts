/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column()
  description: string;

  @Column()
  ingredients: string;

  @Column()
  qty: number;

  @Column('numeric', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column()
  photo: string;
}
