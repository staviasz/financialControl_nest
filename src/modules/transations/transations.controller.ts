import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateTransationDto } from './dto/create-transation.dto';
import { TransationsService } from './transations.service';

@UseGuards(AuthGuard)
@Controller('transations')
export class TransationsController {
  constructor(private readonly transationsService: TransationsService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createTransationDto: CreateTransationDto,
  ) {
    return this.transationsService.create(req.user.id, createTransationDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.transationsService.findAll(req.user.id);
  }

  @Get('/extract')
  extract(@Req() req: Request) {
    return this.transationsService.extract(req.user.id);
  }

  @Get(':idTransation')
  findOne(@Req() req: Request, @Param('idTransation') idTransation: string) {
    return this.transationsService.findOne(req.user.id, +idTransation);
  }
}
