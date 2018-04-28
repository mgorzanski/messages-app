export const informations = (state = '', action) => {
    if (action.type === 'FETCH_INFORMATIONS_SUCCESS') {
        return action.informations
    } else {
        return state;
    }
}