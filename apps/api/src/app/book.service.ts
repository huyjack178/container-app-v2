import { Injectable } from '@nestjs/common';
import { isUndefined } from 'util';


export class BookCreateDto {
  @isUndefined()
  name: string;
}

@Injectable()
export class BookService {
  books() {
    return ['BookA', 'BookB'];
  }
}
