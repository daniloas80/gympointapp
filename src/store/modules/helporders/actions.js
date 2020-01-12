// função que efetivamente vai para o saga para fazer o update no banco
export function questionHelpOrdersRequest(data, id) {
  return {
    type: '@helporders/QUESTION_HELPORDERS_REQUEST',
    payload: { data, id },
  };
}

export function questionHelpOrdersSuccess(data) {
  return {
    type: '@helporders/QUESTION_HELPORDERS_SUCCESS',
    payload: data,
  };
}

export function questionHelpOrdersFailure() {
  return {
    type: '@helporders/QUESITON_HELPORDERS_FAILURE',
  };
}
