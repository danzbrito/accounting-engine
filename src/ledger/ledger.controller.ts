import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LedgerService } from './ledger.service';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';

@Controller()
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @MessagePattern('createLedger')
  create(@Payload() createLedgerDto: CreateLedgerDto) {
    return this.ledgerService.create(createLedgerDto);
  }

  @MessagePattern('findAllLedger')
  findAll() {
    return this.ledgerService.findAll();
  }

  @MessagePattern('findOneLedger')
  findOne(@Payload() id: number) {
    return this.ledgerService.findOne(id);
  }

  @MessagePattern('updateLedger')
  update(@Payload() updateLedgerDto: UpdateLedgerDto) {
    return this.ledgerService.update(updateLedgerDto.id, updateLedgerDto);
  }

  @MessagePattern('removeLedger')
  remove(@Payload() id: number) {
    return this.ledgerService.remove(id);
  }
}
