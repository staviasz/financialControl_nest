import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { TransationsModule } from './modules/transations/transations.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, CategoryModule, TransationsModule],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
