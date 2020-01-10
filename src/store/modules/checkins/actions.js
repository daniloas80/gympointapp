export function checkinRequest(student_id, name) {
  return {
    type: '@checkins/CHECKIN_REQUEST',
    payload: { student_id, name },
  };
}

export function checkinSuccess(data) {
  return {
    type: '@checkins/CHECKIN_SUCCESS',
    payload: data,
  };
}

export function checkinFailure() {
  return {
    type: '@checkins/CHECKIN_FAILURE',
  };
}
