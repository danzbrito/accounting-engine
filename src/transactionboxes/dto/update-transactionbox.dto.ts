import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionboxDto } from './create-transactionbox.dto';

export class UpdateTransactionboxDto extends PartialType(CreateTransactionboxDto) {
  id: number;
}
