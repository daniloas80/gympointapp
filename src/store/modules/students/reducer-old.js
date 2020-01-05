export default function student(state = [], action) {
    switch (action.type) {
        case 'UPDATE_STUDENT':
            return [...state, action.student];
        default:
            return state;
    }
}
