import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JournalModule } from './journal/journal.module';
import { CoaModule } from './coa/coa.module';
import { LedgerModule } from './ledger/ledger.module';
import { TransactionboxesModule } from './transactionboxes/transactionboxes.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // Time to live in miliseconds
        limit: 111, // Maximum number of requests within the ttl
        ignoreUserAgents: [/Insomnia/], // Ignore requests from Insomnia
      }
    ]),
    JournalModule,
    CoaModule,
    LedgerModule,
    TransactionboxesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }