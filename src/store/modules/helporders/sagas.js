/* eslint-disable camelcase */
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// import history from '~/services/history';
import api from '~/services/api';

import {
  answerHelpOrdersSuccess,
  answerHelpOrdersRequest,
  answerHelpOrdersFailure,
} from './actions';

export function* helpOrderList() {
  yield call(api.get, `help-orders`);
}

// A funcção abaixo eu utilizo para carregar os dados quando o usuário clica no botão editar
// Ele passa por aqui para que os campos do formulário possam ser preenchidos.
export function* helpOrderAnswerRequest({ payload }) {
  const { student_id, id } = payload.data;
  const response = yield call(
    api.get,
    `student/${student_id}/help-orders/${id}`
  );

  const helpOrders = response.data;

  yield put(answerHelpOrdersRequest(helpOrders));
  // history.push(`plansform?id=${id}`);
}

export function* helpOrderAnswer({ payload }) {
  const { answer } = payload.data;
  try {
    const helpOrdersId = payload.id;
    const { student_id } = payload;
    const response = yield call(api.put, `help-orders/${helpOrdersId}/answer`, {
      student_id,
      answer,
    });

    toast.success('Pedido de auxílio respondido com sucesso!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

    yield put(answerHelpOrdersSuccess(response));

    const responseList = yield call(api.get, `help-orders`);

    yield put(answerHelpOrdersSuccess(responseList));
    // helpOrderList();
  } catch (err) {
    toast.error(
      'Erro ao atualizar os dados, confira as informações preenchidas',
      {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      }
    );
    yield put(answerHelpOrdersFailure());
  }
}

export default all([
  takeLatest('@helporders/ANSWER_HELPORDERS_REQUEST', helpOrderAnswerRequest),
  takeLatest('@helporders/ANSWER_HELPORDERS', helpOrderAnswer),
  //   takeLatest('@helporders/HELPORDERS_SUCCESS', helpOrderList),
]);
