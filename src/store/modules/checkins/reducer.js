import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  student_id: null,
};

export default function checkins(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@checkins/CHECKIN_REQUEST': {
        draft.checkins = action.payload.data;
        draft.loading = true;
        break;
      }
      case '@checkins/CHECKIN_SUCCESS': {
        draft.checkins = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@checkins/CHECKIN_FAILURE': {
        draft.loading = false;
        break;
      }
      default: // O default desta condicional de switch() não precisa retornar algo
    }
  });
}
