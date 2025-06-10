import { Injectable } from '@nestjs/common';
import { CreateCoaDto } from './dto/create-coa.dto';
import { UpdateCoaDto } from './dto/update-coa.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Coa, CoaDocument } from './schemas/coa.schema';
import { TransactionboxesService } from 'src/transactionboxes/transactionboxes.service';
import { LoggerService } from 'src/logger/logger.service';
import moment from 'moment-timezone';

@Injectable()
export class CoaService {
  constructor(
    @InjectConnection()
    private conn: Connection,
    @InjectModel(Coa.name)
    private coaModel: Model<CoaDocument>,
    private transactionboxesService: TransactionboxesService,
    private readonly logger: LoggerService,
  ) { }

  private getTimestamp() {
    return moment()
      .tz(process?.env?.TZ || 'Asia/Jakarta')
      .format('YYYY-MM-DD HH:mm:ss');
  }


  create(createCoaDto: CreateCoaDto) {
    return 'This action adds a new coa';
  }

  findAll() {
    return `This action returns all coa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coa`;
  }

  update(id: number, updateCoaDto: UpdateCoaDto) {
    return `This action updates a #${id} coa`;
  }

  remove(id: number) {
    return `This action removes a #${id} coa`;
  }
}
