/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
import api from '../../../services/api';

import {
  questionHelpOrdersSuccess,
  questionHelpOrdersFailure,
} from './actions';

export function* helpOrdersQuestionRequest({ payload }) {
  try {
    const question = payload.data;
    const student_id = payload.id;
    const response = yield call(
      api.post,
      `students/${student_id}/help-orders`,
      {
        question,
      }
    );

    const msg = response.data.message;

    Alert.alert('', msg);

    yield put(questionHelpOrdersSuccess(response));
  } catch (err) {
    Alert.alert('Falha no envio', 'verifique os seus dados');

    yield put(questionHelpOrdersFailure());
  }
}

export default all([
  takeLatest(
    '@helporders/QUESTION_HELPORDERS_REQUEST',
    helpOrdersQuestionRequest
  ),
]);
