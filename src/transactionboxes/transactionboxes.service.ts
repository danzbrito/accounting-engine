import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import {
  TransactionBox,
  TransactionBoxDocument,
} from './schemas/transactionboxes.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class TransactionboxesService {
  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectModel(TransactionBox.name)
    private transModel: Model<TransactionBoxDocument>,
  ) {}

  async find(trxRefID: string) {
    const checkvalid = mongoose.Types.ObjectId.isValid(trxRefID)
    const newId = new mongoose.Types.ObjectId();
    const id = checkvalid ? trxRefID : newId;
    const resData = await this.transModel
      .findOne({ trxRefID: id })
      .sort({ createAt: -1 });
    return resData;
  }

  async findOne(field: string, value: string) {
    const resData = await this.transModel
      .findOne({ [field]: value })
      .sort({ createAt: -1 });
    return resData;
  }

  async create(payload: any, session: mongoose.ClientSession | null = null) {
    const { trxRefID, trxRefNo, requestTime, data } = payload;
    const createdTrans = new this.transModel({
      trxRefID,
      trxRefNo,
      requestTime,
      data,
    });
    await createdTrans.save({ session });
  }
}
