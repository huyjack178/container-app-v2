import { Module } from '@nestjs/common';
import { BookService } from './book.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BookService],
})
export class AppModule {}
