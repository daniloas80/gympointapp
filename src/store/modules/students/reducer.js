import produce from 'immer';

const INITIAL_STATE = {
    loading: false,
    name: null,
    email: null,
    age: null,
    weight: null,
    height: null,
};

export default function student(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@student/ADD_STUDENT_REQUEST': {
                draft.student = action.payload.data;
                draft.loading = true;
                break;
            }
            case '@student/STUDENT_SUCCESS': {
                draft.student = action.payload.data;
                draft.loading = false;
                break;
            }
            case '@student/STUDENT_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@student/UPDATE_STUDENT': {
                draft.student = action.payload.data;
                draft.loading = true;
                break;
            }
            case '@student/UPDATE_STUDENT_REQUEST': {
                draft.student = action.payload.data;
                draft.loading = false;
                break;
            }
            case '@student/UPDATE_STUDENT_SUCCESS': {
                draft.student = action.payload.data;
                draft.loading = false;
                break;
            }
            case '@student/DELETE_STUDENT_REQUEST': {
                draft.student = action.payload.id;
                draft.loading = true;
                break;
            }
            case '@student/DELETE_STUDENT_SUCCESS': {
                draft.student = action.payload.id;
                draft.loading = false;
                break;
            }
            case '@student/DELETE_STUDENT_FAILURE': {
                draft.loading = false;
                break;
            }
            default: // O default desta condicional de switch() não precisa retornar algo
        }
    });
}
