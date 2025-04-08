
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;  // ✅ Add this field

  @Column()
  password: string;  // You can also add username, createdAt, etc., as needed
}
