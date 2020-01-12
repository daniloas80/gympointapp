import { combineReducers } from 'redux';

// import { toastsReducer as toasts } from 'react-toastify-redux';
import auth from './auth/reducer';
import checkin from './checkins/reducer';
// import user from './user/reducer';
// import student from './students/reducer';
// import plan from './plans/reducer';
import helporders from './helporders/reducer';

export default combineReducers({
  auth,
  checkin,
  helporders,
  // user,
  // student,
  // plan,
  // helporders,
});
