// função que efetivamente vai para o saga para fazer o update no banco
export function answerHelpOrders(data, id, student_id) {
    return {
        type: '@helporders/ANSWER_HELPORDERS',
        payload: { data, id, student_id },
    };
}

// função que uso para carragegar o state ao clicar no botão editar da listagem de alunos
export function answerHelpOrdersRequest(student_id, id) {
    return {
        type: '@helporders/ANSWER_HELPORDERS_REQUEST',
        payload: { student_id, id },
    };
}

export function answerHelpOrdersSuccess(data) {
    return {
        type: '@helporders/HELPORDERS_SUCCESS',
        payload: data,
    };
}

export function answerHelpOrdersFailure() {
    return {
        type: '@helporders/HELPORDERS_FAILURE',
    };
}
