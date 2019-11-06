import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  nameSession: string;

  constructor(public authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('auth')
      .subscribe((auth: any) => this.nameSession = auth.user ? auth.user.name : null);
  }

  logout() {
    this.authService.logout();
  }

}
