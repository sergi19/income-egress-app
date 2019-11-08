import { Action } from '@ngrx/store';
import { IncomeEgress } from './income-egress.model';

export const SET_ITEMS = '[Income Egress] Set Items';
export const UNSET_ITEMS = '[Income Egress] Unset Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor(public items: IncomeEgress[]) {}
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

export type IncomeEgressActions = SetItemsAction | UnsetItemsAction;