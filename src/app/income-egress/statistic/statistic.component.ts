import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeEgress } from '../income-egress.model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  totalIncomes: number;
  totalEgress: number;

  numberOfIncomes: number;
  numberOfEgress: number;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('incomeEgress')
      .subscribe(incomeEgress => {
        this.getInfoIncomeEgress(incomeEgress.items);
      });
  }

  getInfoIncomeEgress(items: IncomeEgress[]) {
    this.totalIncomes = 0;
    this.totalEgress = 0;
    this.numberOfIncomes = 0;
    this.numberOfEgress = 0;
    items.forEach(item => {
      if (item.type === 'income') {
        this.numberOfIncomes++;
        this.totalIncomes += item.amount;
      } else {
        this.numberOfEgress++;
        this.totalEgress += item.amount;
      }
    });
    this.doughnutChartData = [this.totalIncomes, this.totalEgress];
  }

}
