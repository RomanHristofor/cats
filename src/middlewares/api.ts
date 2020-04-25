import { Dispatch, Middleware, AnyAction } from 'redux'
import {START, SUCCESS, FAIL} from '../constants'
import {UserInterface} from '../reducer/users'

export interface Action {
    type: string
    callAPI?: string
    payload?: UserInterface
}

export const api: Middleware<Dispatch> = store => next =>
    (action: Action | AnyAction) => {

    const {callAPI, type, ...rest} = action;
    if (!callAPI) return next(action);

    next({
        ...rest,
        type: type + START
    });
    //maybe better to add headers to the Server (Access-Control-Allow-Origin: %HOST%) ?
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    setTimeout(() => {
        fetch(proxyUrl + callAPI)
            .then(res => res.json())
            .then(response => next({...rest, type: type + SUCCESS, response}))
            .catch(error => next({...rest, type: type + FAIL, error}))
    }, 500)
}