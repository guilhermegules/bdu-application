import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BankAccountService } from '../services/bank-account.service';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(createBankAccountDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountService.findOne(id);
  }
}
