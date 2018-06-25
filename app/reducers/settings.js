export const settings = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DISPLAY_GROUPS_IN_TAB_NAVIGATOR':
            return {
                ...state,
                displayGroupsInTabNavigator: action.value
            };
        default:
            return state;
    }
}