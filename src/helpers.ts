import {UserInterface, LoadUserInterface, UserRecord} from './reducer/users'

export function extendsItemInEntities(entities: UserInterface[], newProps: UserRecord) {
    const extendedEntities = entities.map(item => {
        return convertIdNumberToString(item);
    });
    return extendedEntities
        .map(obj => ({ ...obj, ...newProps }));
}

export function convertIdNumberToString(obj: LoadUserInterface | UserInterface) {
    obj.id = obj.id.toString();
    return obj;
}

export function setToEntities(entities : UserInterface[]) {
    return entities.map(o => o);
}

export function inverseSelected(user: UserInterface) {
    user.isSelected = !user.isSelected;
    return user;
}

export function changeUserStatusAndDateFormat(user: UserInterface) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour:'numeric',
        minute: 'numeric',
        timezone: 'UTC'
    };
    if (user.userStatus === 'X') {
        user.userStatus = 'R';
        return user.dateOfDeletion = new Date().toLocaleString('ru', options);
    }
    user.userStatus = 'X';
    return user.dateOfDeletion = '';
}