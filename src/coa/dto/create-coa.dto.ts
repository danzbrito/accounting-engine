import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum AccountType {
  NOMINAL = 'NOMINAL',
  REAL = 'REAL',
}

export class CreateCoaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    accountID: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    accountCode: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    accountName: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(AccountType)
    @ApiProperty()
    accountType: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    accountGroupCode: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    accountGroupName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    normalAccount: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isActive: boolean;
}
