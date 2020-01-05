// função que efetivamente vai para o saga para fazer o update no banco
export function updateStudent(data, id) {
    return {
        type: '@student/UPDATE_STUDENT',
        payload: { data, id },
    };
}

// função que uso para carragegar o state ao clicar no botão editar da listagem de alunos
export function updateStudentRequest(data) {
    return {
        type: '@student/UPDATE_STUDENT_REQUEST',
        payload: { data },
    };
}

export function updateStudentSuccess(data) {
    return {
        type: '@student/UPDATE_STUDENT_SUCCESS',
        payload: data,
    };
}

export function updateStudentFailure() {
    return {
        type: '@student/UPDATE_STUDENT_FAILURE',
    };
}

export function studentRequest(data) {
    return {
        type: '@student/ADD_STUDENT_REQUEST',
        payload: { data },
    };
}

export function studentSuccess(data) {
    return {
        type: '@student/STUDENT_SUCCESS',
        payload: { data },
    };
}

export function studentFailure() {
    return {
        type: '@student/STUDENT_FAILURE',
    };
}

export function studentDeleteRequest(id) {
    return {
        type: '@student/DELETE_STUDENT_REQUEST',
        payload: { id },
    };
}

export function studentDeleteSuccess(id) {
    return {
        type: '@student/DELETE_STUDENT_SUCCESS',
        payload: { id },
    };
}

export function studentDeleteFailure() {
    return {
        type: '@student/DELETE_STUDENT_FAILURE',
    };
}
