import * as fromUI from './ui.actions';

export interface UIState {
    isLoading: boolean;
}

const initialState: UIState = {
    isLoading: false
}

export function uiReducer(state = initialState, actions: fromUI.UiActions): UIState {
    switch (actions.type) {
        case fromUI.ACTIVE_LOADING:
            return {
                isLoading: true
            }
        case fromUI.DEACTIVE_LOADING:
            return {
                isLoading: false
            }
        default:
            return state;
    }
}
