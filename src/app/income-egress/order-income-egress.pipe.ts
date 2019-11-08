import { Pipe, PipeTransform } from '@angular/core';
import { IncomeEgress } from './income-egress.model';

@Pipe({
  name: 'orderIncomeEgress'
})
export class OrderIncomeEgressPipe implements PipeTransform {

  transform(items: IncomeEgress[]): any {
    return items.sort((a) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    })
  }

}
