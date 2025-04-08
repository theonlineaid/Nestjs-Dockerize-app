// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,  // Inject UserRepository here
  ) {}

  async findByEmail(email: string): Promise<User | null> {  // Allow null as return type
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {  // Allow null as return type
    return this.userRepo.findOne({ where: { id } });
  }

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, password: hashedPassword });
    return this.userRepo.save(user);
  }
}
