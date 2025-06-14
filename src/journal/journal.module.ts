import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';

@Module({
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
