// cards.module.ts
import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ⬅️ isso é crucial
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}