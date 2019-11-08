import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IncomeEgress } from './income-egress.model';
import { IncomeEgressService } from './income-egress.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActiveLoadingAction, DeactiveLoadingAction } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-egress',
  templateUrl: './income-egress.component.html',
  styleUrls: ['./income-egress.component.css']
})
export class IncomeEgressComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  type = 'income';
  loading: boolean;
  subscription: Subscription = new Subscription();

  constructor(
    private incomeEgressService: IncomeEgressService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
    this.formGroup = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createIncomeEgress() {
    this.store.dispatch(new ActiveLoadingAction());
    const newIncomeEgress = new IncomeEgress({...this.formGroup.value, type: this.type});
    this.incomeEgressService.createIncomEgress(newIncomeEgress)
      .then(() => {
        this.store.dispatch(new DeactiveLoadingAction());
        this.formGroup.reset({amount: 1});
        this.type = 'income';
        Swal.fire('Creado', newIncomeEgress.description, 'success');
      });
  }

}
