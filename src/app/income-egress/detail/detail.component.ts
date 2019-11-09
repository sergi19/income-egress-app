import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeEgress } from '../income-egress.model';
import { Subscription } from 'rxjs';
import { IncomeEgressService } from '../income-egress.service';
import Swal from 'sweetalert2';
import { AppStateIncomeEgress } from '../income-egress.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  items: IncomeEgress[];
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppStateIncomeEgress>,
    public incomeEgressService: IncomeEgressService
  ) { }

  ngOnInit() {
    this.store.select('incomeEgress')
      .subscribe(incomeEgress => {
        this.items = incomeEgress.items;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteItem(item: IncomeEgress) {
    this.incomeEgressService.deleteIncomeEgress(item.uid)
      .then(() => {
        Swal.fire('Eliminado', item.description, 'success');
      })
  }

}
