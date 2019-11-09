import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { UnsetUserAction } from 'src/app/auth/auth.actions';
import { UnsetItemsAction } from 'src/app/income-egress/income-egress.actions';
import { IncomeEgressService } from 'src/app/income-egress/income-egress.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  nameSession: string;

  constructor(
    public authService: AuthService,
    public incomeEgressService: IncomeEgressService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe((auth: any) => this.nameSession = auth.user.name);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.incomeEgressService.cancelSubscriptions();
  }
}
