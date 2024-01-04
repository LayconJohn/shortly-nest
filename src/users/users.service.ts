import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { BadRequesterror } from 'src/errors/index';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(createUserDto: CreateUserDto) {
    
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequesterror('Password and confirm Passowrd must be the same')
    }

    return this.prismaService.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await bcrypt.hash(createUserDto.password, 10)
      }
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
