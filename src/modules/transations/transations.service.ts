import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransationDto } from './dto/create-transation.dto';

@Injectable()
export class TransationsService {
  constructor(private prisma: PrismaService) {}
  async create(id: number, createTransationDto: CreateTransationDto) {
    await this.prisma.category.findUniqueOrThrow({
      where: {
        id: createTransationDto.categoryId,
      },
    });
    try {
      return await this.prisma.transations.create({
        data: {
          ...createTransationDto,
          userId: id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findAll(id: number) {
    return await this.prisma.transations.findMany({
      where: {
        userId: id,
      },
    });
  }

  async findOne(idUser: number, idTransation: number) {
    return await this.prisma.transations.findFirst({
      where: {
        id: idTransation,
        userId: idUser,
      },
    });
  }

  async extract(id: number) {
    const queries = [
      this.prisma.transations.aggregate({
        _count: true,
        _sum: {
          value: true,
        },
        where: {
          userId: id,
          type: 'deposit',
        },
      }),
      this.prisma.transations.aggregate({
        _count: true,
        _sum: {
          value: true,
        },
        where: {
          userId: id,
          type: 'withdraw',
        },
      }),
      this.prisma.transations.aggregate({
        _count: true,
        _sum: {
          value: true,
        },
        where: {
          userId: id,
          type: 'transfer',
        },
      }),
    ];

    try {
      const [deposit, withdraw, transfer] = await Promise.all(queries);

      return { deposit, withdraw, transfer };
    } catch (error) {
      return error.message;
    }
  }
}
