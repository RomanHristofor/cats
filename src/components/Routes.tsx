import React, {Component} from 'react'
import {connect} from "react-redux"
import {Route, RouteComponentProps, RouteProps} from 'react-router-dom'
import User from './User'
import UserList from './UserList'
import {UserInterface} from '../reducer/users'
import {RootState, entitiesSelector} from "../selectors"
import {Main} from './css'

interface RouterProps {
    id: string
}

interface Props extends RouteProps {
    entities: UserInterface[]
}

class Routes extends Component<Props> {
    getIndex = ({match}: RouteComponentProps<RouterProps>) => {
        const {id} = match.params;
        return <User
            id={id} key={id}
            selectedUser={()=>{}}
            loadUser={()=>{}}
        />
    };

    findSelectedUser = () => {
        const {entities} = this.props;
        const getUser = entities.find(item => item.isSelected);
        return <User
            clearUser={getUser}
            selectedUser={()=>{}}
            loadUser={()=>{}}
        />
    };

    render() {
        return (
            <Main>
                <UserList/>
                <Route path="/cats" render={this.findSelectedUser} exact/>
                <Route path="/cats/:id" render={this.getIndex}/>
            </Main>
        )
    }
}

export default connect((state: RootState) => ({
    entities: entitiesSelector(state),
}))(Routes)
