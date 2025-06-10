import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoaService } from './coa.service';
import { CreateCoaDto } from './dto/create-coa.dto';
import { UpdateCoaDto } from './dto/update-coa.dto';
import { TransactionboxesService } from 'src/transactionboxes/transactionboxes.service';
import { LoggerService } from 'src/logger/logger.service';

@Controller('coa')
export class CoaController {
  constructor(
    private readonly coaService: CoaService,
    private readonly transactionboxesService: TransactionboxesService,
    private readonly logger: LoggerService,
  ) { }

  @Post('create')
  create(@Body() createCoaDto: CreateCoaDto) {
    const check = this.transactionboxesService.find(createCoaDto.accountID);
    if (!check) {
      this.logger.error(`Transaction box not found for accountID: ${createCoaDto.accountID}`);
      return this.coaService.create(createCoaDto);
    }
  }

  @Get('getall')
  findAll() {
    return this.coaService.findAll();
  }

  @Get('getbyid/:id')
  findOne(@Param('id') id: string) {
    return this.coaService.findOne(+id);
  }

  @Patch('updatebyid/:id')
  update(@Param('id') id: string, @Body() updateCoaDto: UpdateCoaDto) {
    return this.coaService.update(+id, updateCoaDto);
  }

  @Delete('deletebyid/:id')
  remove(@Param('id') id: string) {
    return this.coaService.remove(+id);
  }
}
