import {
    INPUT_NAME,
    CHANGE_PAGES,
    LOAD_ALL_USERS,
    LOAD_USER,
    CHANGE_USER_STATUS,
    SELECTED_USER,
    HOST
} from '../constants'
import {UserInterface} from '../reducer/users'
import {ActionType} from '../reducer/filters'


export function inputFiltratedByName(value: string) {
    return {
        type: INPUT_NAME,
        payload: { value }
    }
}

export function changePages(payload: ActionType) {
    return {
        type: CHANGE_PAGES,
        payload
    }
}

export function selectedUser(user: UserInterface) {
    return {
        type: SELECTED_USER,
        payload: user
    }
}

export function changeUserStatus(user: UserInterface) {
    return {
        type: CHANGE_USER_STATUS,
        payload: user
    }
}

export function loadAllUsers() {
    return {
        type: LOAD_ALL_USERS,
        callAPI: `${HOST}/list.json`
    }
}

export function loadUser(link: string) {
    return {
        type: LOAD_USER,
        callAPI: `${HOST}${link}`
    }
}
