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

  async create(payload: CreateCoaDto) {
    const session = await this.conn.startSession();
    session.startTransaction();
    try {
      const { accountID, accountCode, accountName } = payload;
      const checkCoa = await this.coaModel.findOne({ accountID });
      if (checkCoa) {
        this.logger.info({
          logging_service: 'CoaService',
          logging_type: 'RES_IN',
          client_id: 'console',
          message: `COA with accountID ${accountID} already exists`,
          timestamp: this.getTimestamp(),
        })
        throw new Error(`COA with coaRefID ${accountID} already exists.`);
      } else {
        const coa = new this.coaModel({
          ...payload,
        });
        const createdCoa = await coa.save({ session });
      }
      await session.commitTransaction();
    } catch (error) {

      await session.abortTransaction();

    } finally {
      await session.endSession();
    }
  }

  findAll() {
    return `This action returns all coa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coa`;
  }

  async update(id: number, payload: UpdateCoaDto) {
    const session = await this.conn.startSession();
    session.startTransaction();
    try {
      const { accountID, accountCode, accountName } = payload;
      const checkCoa = await this.coaModel.findOneAndUpdate(
        { accountID },
        { ...payload },
        { new: true, session }
      );
      await session.commitTransaction();
      this.logger.info({
        logging_service: 'CoaService',
        logging_type: 'RES_IN',
        client_id: 'console',
        message: `COA with accountID ${accountID} already exists`,
        timestamp: this.getTimestamp(),
      })
    } catch (error) {
      await session.abortTransaction();
      this.logger.error({
        logging_service: 'CoaService',
        logging_type: 'RES_IN',
        client_id: 'console',
        message: `Error updating COA with accountID ${id}: ${error.message}`,
        timestamp: this.getTimestamp(),
      });
    } finally {
      await session.endSession();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} coa`;
  }
}
