import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  student_id: null,
  question: null,
  name: null,
};

export default function helporders(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helporders/QUESTION_HELPORDERS_REQUEST': {
        draft.helporders = action.payload.data;
        draft.loading = true;
        break;
      }
      case '@helporders/QUESTION_HELPORDERS_SUCCESS': {
        draft.helporders = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@helporders/QUESITON_HELPORDERS_FAILURE': {
        draft.loading = false;
        break;
      }
      default: // O default desta condicional de switch() não precisa retornar algo
    }
  });
}
