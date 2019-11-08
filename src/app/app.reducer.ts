import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIncomeEgress from './income-egress/income-egress.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.UIState,
    auth: fromAuth.AuthState,
    incomeEgress: fromIncomeEgress.IncomeEgressState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    incomeEgress: fromIncomeEgress.incomeEgressReducer
}