import { Alert } from 'react-native';
import { takeLatest, call, put, all, delay } from 'redux-saga/effects';

// import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function signOut() {
  //   history.push('/');
}

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `students/${id}`);

    // const { student } = response.data;

    // api.defaults.headers.Authorization = `Bearer ${token}`;
    // o delay abaixo não é necessário, está aí como perfumaria, mas ele poderá ser útil em outros casos
    yield delay(1000);
    yield put(signInSuccess(response.data));
    //   history.push('/');
  } catch (err) {
    Alert.alert('Falha na autenticação', 'verifique os seus dados');

    yield put(signFailure());
  }
}

// a função abaixo set o token para toda aplicação depois do primeiro acesso
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
