import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JournalModule } from './journal/journal.module';
import { CoaModule } from './coa/coa.module';
import { LedgerModule } from './ledger/ledger.module';

@Module({
  imports: [JournalModule, CoaModule, LedgerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
