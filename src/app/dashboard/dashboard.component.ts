import { Component, OnInit } from '@angular/core';
import { IncomeEgressService } from '../income-egress/income-egress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  constructor(public incomeEgressService: IncomeEgressService) { }

  ngOnInit() {
    this.incomeEgressService.initIncomeEgressListener();
  }

}
