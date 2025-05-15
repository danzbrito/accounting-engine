import { Injectable } from '@nestjs/common';
import { CreateCoaDto } from './dto/create-coa.dto';
import { UpdateCoaDto } from './dto/update-coa.dto';

@Injectable()
export class CoaService {
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
