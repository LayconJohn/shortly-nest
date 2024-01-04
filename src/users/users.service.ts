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

    const createdUser = await this.prismaService.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await bcrypt.hash(createUserDto.password, 10)
      }
    });

    return {
      ...createdUser,
      password: undefined
    }
  }

  findByEmail(email: string) {
    return this.prismaService.users.findFirst({
      where:{
        email
      }
    })
  }
}
