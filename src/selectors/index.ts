import {createSelector} from 'reselect'
import {UserInterface, StateUsersInterface} from '../reducer/users'
import {StateFiltersInterface} from '../reducer/filters'

export interface RootState {
    filters: StateFiltersInterface
    users: StateUsersInterface
}

const filtersGetter = (state: RootState) => state.filters;
const userNameGetter = (state: RootState) => state.filters.userName;
const paginationGetter = (state: RootState) => state.filters.pagination;
export const userNameSelector = createSelector(userNameGetter, userName => userName);
export const paginationSelector = createSelector(paginationGetter, pagination => pagination);


const usersGetter = (state: RootState) => state.users.entities;
export const entitiesSelector = createSelector(usersGetter, entities => entities);
const userGetter = (state: RootState) => state.users.user;
export const userSelector = createSelector(userGetter, user => user);

const loadingGetter = (state: RootState) => state.users.loading;
export const loadingSelector = createSelector(loadingGetter, loading => loading);
const loadedGetter = (state: RootState) => state.users.loaded;
export const loadedSelector = createSelector(loadedGetter, loaded => loaded);


export const filtratedUsersSelector = createSelector(
    usersGetter, filtersGetter, (users, filters) => {
        const {userName, pagination} = filters;

        return users
            .filter((user: UserInterface) => userName ?
                user.name.toLowerCase().includes(userName.toLowerCase())
                : user
            )
            .slice((pagination.page * pagination.pageSize) - pagination.pageSize,
                pagination.page * pagination.pageSize)
            .sort((a: UserInterface, b: UserInterface) => {
                if (a.userStatus > b.userStatus) {
                    return -1;
                }
                if (a.userStatus < b.userStatus) {
                    return 1;
                }
                return 0;
            })
    });
