import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
    planSuccess,
    planFailure,
    updatePlanSuccess,
    updatePlanFailure,
    updatePlanRequest,
} from './actions';

export function* planCreate({ payload }) {
    const { title, duration, price } = payload.data;
    try {
        const response = yield call(api.post, 'plans', {
            title,
            duration,
            price,
        });

        const plan = response.data;

        yield put(planSuccess(plan));
        toast.success('Cadastro realizado com sucesso', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
        // history.push('/');
    } catch (err) {
        toast.error('Erro ao tentar salavar os dados', {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
        yield put(planFailure());
    }
}

// A funcção abaixo eu utilizo para carregar os dados quando o usuário clica no botão editar
// Ele passa por aqui para que os campos do formulário possam ser preenchidos.
export function* planUpdateRequest({ payload }) {
    const { id } = payload.data;
    const response = yield call(api.get, `plans/${id}/show-plan`);

    const planReq = response.data;

    yield put(updatePlanRequest(planReq));
    history.push(`plansform?id=${id}`);
}

export function* planUpdate({ payload }) {
    const { title, duration, price } = payload.data;
    try {
        //   const { name, email, age, weight, height } = payload.data;

        const planId = payload.id;
        const response = yield call(api.put, `plans/${planId}`, {
            title,
            duration,
            price,
        });

        toast.success('Plano atualizado com sucesso!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
        yield put(updatePlanSuccess(response));
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
        yield put(updatePlanFailure());
    }
}

export function* planDelete({ payload }) {
    const planId = payload.id;
    try {
        const response = yield call(api.delete, `plans/${planId}`, planId);

        const plan = response.data;

        yield put(planSuccess(plan));
    } catch (err) {
        toast.error('Erro ao tentar apagar os dados', {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
        yield put(planFailure());
    }
}

export default all([
    takeLatest('@plan/ADD_PLAN_REQUEST', planCreate),
    takeLatest('@plan/UPDATE_PLAN_REQUEST', planUpdateRequest),
    takeLatest('@plan/UPDATE_PLAN', planUpdate),
    takeLatest('@plan/DELETE_PLAN_REQUEST', planDelete),
]);
