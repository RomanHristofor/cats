import React, {Component} from 'react'
import {connect} from 'react-redux'
import {redirect} from 'react-router-dom'
import Loader from './common/Loader'
import {loadUser, selectedUser} from '../AC'
import {LoadUserInterface, UserInterface} from '../reducer/users'
import {
    entitiesSelector,
    userSelector,
    loadingSelector,
    RootState
} from '../selectors'
import {inverseSelected} from '../helpers'
import {HOST} from '../constants'
import {Bio} from './css'


type Props = {
    id?: string,
    user?: UserInterface,
    findByEntities?: UserInterface[],
    clearUser?: UserInterface,
    loading?: boolean,
    userLoad?: LoadUserInterface | null,
    selectedUser: (user: UserInterface) => void,
    loadUser: (s: string) => void
}


class User extends Component<Props, any> {
    componentDidMount() {
        const {loading, loadUser, userLoad, user, clearUser, selectedUser} = this.props;
        debugger
        if (!loading) {
            if (clearUser && clearUser.id) { //clear selected user for History back
                selectedUser(inverseSelected(clearUser));
            }
            if (user && !user.isSelected) { //History back
                selectedUser(inverseSelected(user));
                const userLoadId = userLoad && userLoad.id;
                if (userLoadId && user.id !== userLoadId) {
                    this.unSelectedPrevUser(userLoadId);
                }
            }
            if (user && !user.dateOfDeletion) loadUser(user.more);
        }

    }

    unSelectedPrevUser = (userId: string) => {
        const {findByEntities, selectedUser} = this.props;
        if (findByEntities && findByEntities.length > 0) {
            const getUser = findByEntities.find(item => item.id === userId);
            if (getUser && getUser.isSelected) {
                selectedUser(inverseSelected(getUser));
            }
        }
    }

    render() {
        const {user, loading} = this.props;
        console.log('render USER', this.props);

        if (loading) return <Loader/>
        if (!user || (user && user.userStatus === 'R')) {
            return <>{redirect('/cats')}</>
        }

        return (
            <div>
                <h3>Selected user name: {user.name}</h3>
                <div>
                    {this.getBody()}
                </div>
            </div>
        )
    }

    getBody() {
        const {userLoad, user} = this.props;
        debugger
        if (!user || !userLoad) return null;

        return (
            <section>
                <b>Short info:</b> {user.shortInfo}<br/>
                <b>Bio:</b>
                <Bio>{userLoad.bio}</Bio>
                <img src={`${HOST}${userLoad.pic}`} alt="Preview"/>
            </section>
        )
    }
}

export default connect((state: RootState, ownProps: Props) => ({
    user: state.users.entities.find((u: UserInterface) => u.id === ownProps.id),
    findByEntities: entitiesSelector(state),
    userLoad: userSelector(state),
    loading: loadingSelector(state)
}), {loadUser, selectedUser})(User)
