// função que efetivamente vai para o saga para fazer o update no banco
export function updatePlan(data, id) {
    return {
        type: '@plan/UPDATE_PLAN',
        payload: { data, id },
    };
}

// função que uso para carragegar o state ao clicar no botão editar da listagem de alunos
export function updatePlanRequest(data) {
    return {
        type: '@plan/UPDATE_PLAN_REQUEST',
        payload: { data },
    };
}

export function updatePlanSuccess(data) {
    return {
        type: '@plan/UPDATE_PLAN_SUCCESS',
        payload: data,
    };
}

export function updatePlanFailure() {
    return {
        type: '@plan/UPDATE_PLAN_FAILURE',
    };
}

export function planRequest(data) {
    return {
        type: '@plan/ADD_PLAN_REQUEST',
        payload: { data },
    };
}

export function planSuccess(data) {
    return {
        type: '@plan/PLAN_SUCCESS',
        payload: { data },
    };
}

export function planFailure() {
    return {
        type: '@plan/PLAN_FAILURE',
    };
}

export function planDeleteRequest(id) {
    return {
        type: '@plan/DELETE_PLAN_REQUEST',
        payload: { id },
    };
}

export function planDeleteSuccess(id) {
    return {
        type: '@plan/DELETE_PLAN_SUCCESS',
        payload: { id },
    };
}

export function planDeleteFailure() {
    return {
        type: '@plan/DELETE_PLAN_FAILURE',
    };
}
