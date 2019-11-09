import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeEgressComponent } from './income-egress.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './detail/detail.component';
import { TypeIncomeEgressPipe } from './type-income-egress.pipe';
import { OrderIncomeEgressPipe } from './order-income-egress.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { incomeEgressReducer } from './income-egress.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeEgressComponent,
    StatisticComponent,
    DetailComponent,
    TypeIncomeEgressPipe,
    OrderIncomeEgressPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('incomeEgress', incomeEgressReducer)
  ]
})
export class IncomeEgressModule { }
