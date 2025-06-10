import { PartialType } from '@nestjs/mapped-types';
import { CreateCoaDto } from './create-coa.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCoaDto extends PartialType(CreateCoaDto) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    accountID: string;

    @ApiProperty()
    accountCode: string;

    @ApiProperty()
    accountName: string;

    @ApiProperty()
    accountType: string;

    @ApiProperty()
    accountGroupCode: string;

    @ApiProperty()
    accountGroupName: string;

    @ApiProperty()
    normalAccount: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    isActive: boolean;
}
