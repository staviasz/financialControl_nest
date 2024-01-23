import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.findByEmail(createUserDto.email);
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 8);

      return await this.prisma.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  findAll() {
    return this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  findOne(req: Request) {
    return req.user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      if (await this.findByEmail(updateUserDto.email, id)) {
        throw new BadRequestException('Email already exists');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8);
    }
    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.users.delete({ where: { id } });
    return;
  }

  async login(loginDto: LoginDto) {
    const findUser = await this.findByEmail(loginDto.email);
    if (!findUser) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      findUser.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Password is not valid');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = findUser;
    return {
      user,
      token: this.jwt.generateToken(user),
    };
  }

  private async findByEmail(email: string, id?: number) {
    return await this.prisma.users.findFirst({
      where: {
        id: { not: id },
        email,
      },
    });
  }
}
