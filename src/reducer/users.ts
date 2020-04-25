import {
    setToEntities,
    extendsItemInEntities,
    convertIdNumberToString
} from '../helpers'
import {
    START,
    SUCCESS,
    LOAD_ALL_USERS,
    LOAD_USER,
    CHANGE_USER_STATUS,
    SELECTED_USER
} from '../constants'

export type LoadUserInterface = {
    id: string
    bio: string
    pic: string
}
export type UserInterface = {
    id: string
    name: string
    shortInfo: string
    more: string
    userStatus: 'X' | 'R'
    dateOfDeletion: string
    isSelected: boolean
}

export type ActionType = {
    type: string
    response: {
        data: UserInterface[]
    } & LoadUserInterface
}

type Nullable<T> = null | T
export type StateUsersInterface = typeof reducerState

const reducerState = {
    loading: false,
    loaded: false,
    entities: [],
    user: null as Nullable<LoadUserInterface>,
}

export interface UserRecord {
    userStatus: 'X' | 'R'
    isSelected: boolean
}

const userRecord: UserRecord = {
    userStatus: 'X',
    isSelected: false,
}


export default (userState = reducerState, action: ActionType) => {
    const {type, response} = action;

    switch (type) {
        case LOAD_ALL_USERS + START:
            return {...userState, loading: true};

        case LOAD_ALL_USERS + SUCCESS:
            return {
                ...userState,
                entities: extendsItemInEntities(
                    response.data, userRecord
                ),
                loading: false,
                loaded: true
            };

        case LOAD_USER + START:
            return {...userState, loading: true};

        case LOAD_USER + SUCCESS:
            return {
                ...userState,
                user: convertIdNumberToString(response),
                loading: false,
                loaded: true
            };

        case CHANGE_USER_STATUS:
            return {...userState,
                entities: setToEntities(userState.entities)
            };

        case SELECTED_USER:
            return {...userState,
                entities: setToEntities(userState.entities)
            };

        default:
            return userState
    }
}