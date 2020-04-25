import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Filters from './Filters/index'
import {UserInterface} from '../reducer/users'
import {filtratedUsersSelector, entitiesSelector, loadingSelector, loadedSelector, RootState} from '../selectors'
import {changeUserStatusAndDateFormat, inverseSelected} from '../helpers'
import {loadAllUsers, changeUserStatus, selectedUser} from '../AC'
import {Link, List, User, Icon} from './css'


type Props = {
    entities: UserInterface[],
    findByEntities: UserInterface[],
    loaded: boolean,
    loading: boolean,
    loadAllUsers: () => void,
    changeUserStatus: (user: UserInterface) => void,
    selectedUser: (user: UserInterface) => void
}

class UsersList extends Component<Props> {
    state = {
        isSelectedUser: true
    }

    componentDidMount() {
        const {loaded, loading, loadAllUsers} = this.props;
        if (!loaded && !loading)
            loadAllUsers()
    }

    handleChangeUserStatus = (user: UserInterface) => {
        const {changeUserStatus, selectedUser} = this.props;
        changeUserStatusAndDateFormat(user);
        changeUserStatus(user);
        if (user.userStatus === 'R' && user.isSelected)
            selectedUser(user);
    }

    handleSelectedUser = (user: UserInterface) => {
        const {selectedUser, findByEntities} = this.props;
        const findPrevSelectedUser = findByEntities.find(item => item.id !== user.id && item.isSelected);

        if (findPrevSelectedUser)
            selectedUser(inverseSelected(findPrevSelectedUser));
        if (!user.isSelected)
            selectedUser(inverseSelected(user));
        this.setState({isSelectedUser: false})
    }


    render() {
        const {entities} = this.props;
        const userDetails = entities.map((user) =>
            <User key={user.id}
                  disabled={user.userStatus === 'R'}
                  isSelected={user.isSelected}
            >
                <Icon onClick={() => this.handleChangeUserStatus(user)}>
                    {user.userStatus}
                </Icon>
                <Link as={NavLink} to={`/cats/${user.id}`}
                      onClick={() => this.handleSelectedUser(user)}
                >
                    <b>{user.userStatus === 'R' ? `Deleted: ` : `Name: `}</b>
                    {user.name}<br/>
                    <b>{user.userStatus === 'R' ? `deleted at ${user.dateOfDeletion}` : `Short Info: `}</b>
                    {user.userStatus !== 'R' && user.shortInfo}
                </Link>
            </User>)

        return (
            <div>
                <Filters/>
                {this.state.isSelectedUser && <h4>Please select user</h4>}
                <List>
                    {userDetails}
                </List>
            </div>
        )
    }
}

export default connect((state: RootState) => ({
    entities: filtratedUsersSelector(state),
    findByEntities: entitiesSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
}), {loadAllUsers, changeUserStatus, selectedUser})(UsersList)
