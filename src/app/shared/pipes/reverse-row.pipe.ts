import { Pipe, PipeTransform } from '@angular/core';
import { ICell } from '../models/Cell.model';

@Pipe({
  name: 'reverseRow',
})
export class ReverseRowPipe implements PipeTransform {
  transform(cells: ICell[][] | undefined): ICell[][] {
    return cells ? cells.reverse() : [];
  }
}
