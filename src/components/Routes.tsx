import React, {Component, Fragment} from 'react'
import { Route, BrowserRouter as RouterRoutes, useParams } from 'react-router-dom';
import {connect} from "react-redux"
import User from './User'
import UserList from './UserList'
import {UserInterface} from '../reducer/users'
import {RootState, entitiesSelector} from "../selectors"
import {Main} from './css'

interface Props {
    entities: UserInterface[];
    children?: React.ReactElement;
}


const Index = () => {
    const { id } = useParams();
    console.log('getIndex ID', id);
    return (
        <User
            id={id}
            key={id}
            selectedUser={() => {}}
            loadUser={() => {}}
        />
    );
};
const FindSelectedUser = (props: any) => {
    const {entities} = props;
    const getUser = entities.find((item: any) => item.isSelected);
    return (<User
        clearUser={getUser}
        selectedUser={()=>{}}
        loadUser={()=>{}}
    />)
};

class Routes extends Component<Props, any> {
    render() {
        return (
            <Main>
                <>
                    <UserList/>
                    <RouterRoutes>
                        <Route path="/cats" element={<FindSelectedUser />} />
                        <Route path="/cats/:id" element={<Index />} />
                    </RouterRoutes>
                </>
            </Main>
        )
    }
}

export default connect((state: RootState) => ({
    entities: entitiesSelector(state),
}))(Routes)
