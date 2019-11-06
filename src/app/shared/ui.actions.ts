import { Action } from '@ngrx/store';

export const ACTIVE_LOADING = '[UI Loading] Loading...';
export const DEACTIVE_LOADING = '[UI Loading] Finish loading...';

export class ActiveLoadingAction implements Action {
    readonly type = ACTIVE_LOADING;
}

export class DeactiveLoadingAction implements Action {
    readonly type = DEACTIVE_LOADING;
}

export type UiActions = ActiveLoadingAction | DeactiveLoadingAction;