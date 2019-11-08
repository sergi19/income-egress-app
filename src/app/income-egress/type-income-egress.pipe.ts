import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIncomeEgress'
})
export class TypeIncomeEgressPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value === 'income' ? value = 'ingreso' : value = 'egreso';
    return value;
  }

}
