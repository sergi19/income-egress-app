import * as fromIncomEgress from './income-egress.actions';
import { IncomeEgress } from './income-egress.model';

export interface IncomeEgressState {
    items: IncomeEgress[]
}

const initialState: IncomeEgressState = {
    items: []
}

export function incomeEgressReducer(state = initialState, action: fromIncomEgress.IncomeEgressActions): IncomeEgressState {
    switch (action.type) {
        case fromIncomEgress.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item => {
                        return {
                            ...item
                        }
                    })
                ]
            }
        case fromIncomEgress.UNSET_ITEMS:
            return {
                items: []
            }
        default:
            return state;
    }
}