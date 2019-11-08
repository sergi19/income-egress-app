import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IncomeEgress } from './income-egress.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './income-egress.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeEgressService {

  incomeEgressListenerSubscription: Subscription = new Subscription();
  incomeEgressGetItemsSubscription: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>
  ) { }

  initIncomeEgressListener() {
    this.incomeEgressListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => {
        this.getIncomeEgressItems(auth.user.uid);
      })
  }

  getIncomeEgressItems(uid: string) {
    this.incomeEgressGetItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
             .snapshotChanges()
             .pipe(
               map(docData => {
                 return docData.map(doc => {
                   return {
                     uid: doc.payload.doc.id,
                     ...doc.payload.doc.data()
                   }
                 })
               })
             )
             .subscribe((collection: any[]) => {
               this.store.dispatch(new SetItemsAction(collection));
             })
  }

  cancelSubscriptions() {
    this.incomeEgressListenerSubscription.unsubscribe();
    this.incomeEgressGetItemsSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  createIncomEgress(incomeEgress: IncomeEgress): any {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
        .collection('items').add({...incomeEgress});
  }

  deleteIncomeEgress(uid: string) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }

}
