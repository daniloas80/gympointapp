import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
import api from '~/services/api';

import {
  studentSuccess,
  studentFailure,
  updateStudentSuccess,
  updateStudentFailure,
  updateStudentRequest,
} from './actions';

export function* studentCreate({ payload }) {
  const { name, email, age, weight, height } = payload.data;
  try {
    const response = yield call(api.post, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });

    const student = response.data;

    yield put(studentSuccess(student));
    // toast.success('Cadastro realizado com sucesso', {
    //     position: 'top-right',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    // });
    // history.push('/');
  } catch (err) {
    // toast.error('Erro ao tentar salavar os dados', {
    //     position: 'top-center',
    //     autoClose: false,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    // });
    yield put(studentFailure());
  }
}

// A funcção abaixo eu utilizo para carregar os dados quando o usuário clica no botão editar
// Ele passa por aqui para que os campos do formulário possam ser preenchidos.
export function* studentUpdateRequest({ payload }) {
  const { id } = payload.data;
  const response = yield call(api.get, `students/${id}/show-student`);

  const stduentReq = response.data;

  yield put(updateStudentRequest(stduentReq));
  // history.push(`studentsform?id=${id}`);
}

export function* studentUpdate({ payload }) {
  const { name, email, age, weight, height } = payload.data;
  try {
    //   const { name, email, age, weight, height } = payload.data;

    const studentId = payload.id;
    const response = yield call(api.put, `students/${studentId}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    // toast.success('Aluno atualizado com sucesso!', {
    //     position: 'top-right',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    // });
    yield put(updateStudentSuccess(response));
  } catch (err) {
    // toast.error(
    //     'Erro ao atualizar os dados, confira as informações preenchidas',
    //     {
    //         position: 'top-center',
    //         autoClose: false,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: false,
    //     }
    // );
    yield put(updateStudentFailure());
  }
}

export function* studentDelete({ payload }) {
  const studentId = payload.id;
  try {
    const response = yield call(api.delete, `students/${studentId}`, studentId);

    const student = response.data;

    yield put(studentSuccess(student));
    // toast.success('Registro apagado com sucesso', {
    //     position: 'top-right',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    // });
    // history.push('/');
  } catch (err) {
    // toast.error('Erro ao tentar apagar os dados', {
    //   position: 'top-center',
    //   autoClose: false,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: false,
    // });
    yield put(studentFailure());
  }
}

export default all([
  takeLatest('@student/ADD_STUDENT_REQUEST', studentCreate),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', studentUpdateRequest),
  takeLatest('@student/UPDATE_STUDENT', studentUpdate),
  takeLatest('@student/DELETE_STUDENT_REQUEST', studentDelete),
]);
