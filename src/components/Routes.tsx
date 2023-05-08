import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom';
import User from './User'
import UserList from './UserList'
import {UserInterface} from '../reducer/users'
import Cats from "./Cats";

interface IProps {
    entities?: UserInterface[];
    children?: React.ReactElement;
}


const Index = () => {
    const { id } = useParams();
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

const MainRoutes = () => {
    return (
        <>
            <UserList />
            <Routes>
                <Route path="/cats" element={<FindSelectedUser />} />
                <Route path="/cats/:id" element={<Index />} />
            </Routes>
        </>
    )
}

export default MainRoutes;
