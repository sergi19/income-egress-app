import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  loading: boolean;

  constructor(
    public authService: AuthService,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data :any) {
    this.authService.createUser(data.name, data.email, data.password);
  }

}
