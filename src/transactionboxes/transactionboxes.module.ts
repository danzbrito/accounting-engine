import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionboxesService } from './transactionboxes.service';
import {
  TransactionBox,
  TransactionBoxSchema,
} from './schemas/transactionboxes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionBox.name, schema: TransactionBoxSchema },
    ]),
  ],
  providers: [TransactionboxesService],
  exports: [TransactionboxesService],
})
export class TransactionboxesModule { }
