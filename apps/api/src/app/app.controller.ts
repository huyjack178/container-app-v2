import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { Message } from '@container-management/api-interfaces';

import { AppService } from './app.service';
import { BookCreateDto, BookService } from './book.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly bookService: BookService
  ) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('books')
  getBooks() {
    throw new BadRequestException('Sample error');
    return this.bookService.books();
  }

  @Post('books')
  createBook(@Body() createDto: BookCreateDto) {
    console.log(createDto);
     return createDto;
  }
}
