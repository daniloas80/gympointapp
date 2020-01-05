import produce from 'immer';

const INITIAL_STATE = {
    loading: false,
    title: null,
    duration: null,
    price: null,
    totalPlice: null,
};

export default function plan(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@plan/ADD_PLAN_REQUEST': {
                draft.plan = action.payload.data;
                draft.loading = true;
                break;
            }
            case '@plan/PLAN_SUCCESS': {
                draft.plan = action.payload.data;
                draft.loading = false;
                break;
            }
            case '@plan/PLAN_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@plan/UPDATE_PLAN': {
                draft.plan = action.payload.data;
                draft.loading = true;
                break;
            }
            case '@plan/UPDATE_PLAN_REQUEST': {
                draft.plan = action.payload.data;
                draft.loading = false;
                break;
            }
            case '@plan/UPDATE_PLAN_SUCCESS': {
                draft.plan = action.payload.data;
                draft.loading = false;
                break;
            }
            case '@plan/DELETE_PLAN_REQUEST': {
                draft.plan = action.payload.id;
                draft.loading = true;
                break;
            }
            case '@plan/DELETE_PLAN_SUCCESS': {
                draft.plan = action.payload.id;
                draft.loading = false;
                break;
            }
            case '@plan/DELETE_PLAN_FAILURE': {
                draft.loading = false;
                break;
            }
            default: // O default desta condicional de switch() não precisa retornar algo
        }
    });
}
