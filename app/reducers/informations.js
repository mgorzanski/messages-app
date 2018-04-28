export const informations = (state = '', action) => {
    if (action.type === 'FETCH_INFORMATIONS') {
        return action.informations
    } else {
        return state;
    }
}