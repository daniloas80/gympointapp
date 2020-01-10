/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
import api from '../../../services/api';

import { checkinSuccess, checkinFailure } from './actions';

export function* checkInRequest({ payload }) {
  try {
    const { student_id } = payload;

    const response = yield call(api.post, `students/${student_id}/checkins`);

    const msg = response.data.message;

    Alert.alert('', msg);

    yield put(checkinSuccess(response));
  } catch (err) {
    Alert.alert('Falha na autenticação', 'verifique os seus dados');

    yield put(checkinFailure());
  }
}

export default all([takeLatest('@checkins/CHECKIN_REQUEST', checkInRequest)]);
