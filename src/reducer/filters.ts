import {
    INPUT_NAME,
    CHANGE_PAGES,
} from '../constants'

const defaultFilters = {
    userName: '',
    pagination: {
        page: 1,
        pageSize: 5,
    },
};
export type StateFiltersInterface = typeof defaultFilters;

export type ActionType = {
    type: string
    payload: {
        value: string
        page: number
    }
}

export default (state = defaultFilters, action: ActionType) => {
    const {type, payload} = action;

    switch (type) {
        case INPUT_NAME:
            defaultFilters.userName = payload.value;
            return {...state, ...defaultFilters}

        case CHANGE_PAGES:
            return {...state, pagination: payload};

        default:
            return state
    }
}