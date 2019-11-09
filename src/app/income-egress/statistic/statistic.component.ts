import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeEgress } from '../income-egress.model';
import { AppStateIncomeEgress } from '../income-egress.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: []
})
export class StatisticComponent implements OnInit {

  totalIncomes: number;
  totalEgress: number;

  numberOfIncomes: number;
  numberOfEgress: number;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppStateIncomeEgress>) { }

  ngOnInit() {
    this.subscription = this.store.select('incomeEgress')
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
