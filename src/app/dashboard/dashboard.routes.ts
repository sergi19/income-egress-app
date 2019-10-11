import { Routes } from '@angular/router';
import { StatisticComponent } from '../income-egress/statistic/statistic.component';
import { IncomeEgressComponent } from '../income-egress/income-egress.component';
import { DetailComponent } from '../income-egress/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticComponent },
    { path: 'income-egress', component: IncomeEgressComponent },
    { path: 'detail', component: DetailComponent }
]