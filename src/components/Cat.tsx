import React from 'react';
import { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Loader from "./common/Loader";
import {connect} from "react-redux";
import {LoadUserInterface, UserInterface} from "../reducer/users";
import {entitiesSelector, loadingSelector, RootState, userSelector} from "../selectors";
import {loadUser, selectedUser} from "../AC";

interface IProps {
    id?: string,
    user?: UserInterface;
    loading?: boolean;
    findByEntities?: UserInterface[],
}

const Cat = ({
  findByEntities = [],
  loading = false,
  user = {
    shortInfo: ''
  },
}) => {
    const { id } = useParams();
    const [item, setItem] = useState(user);


    useEffect(() => {
        if (id) {
            const found = findByEntities.find((item: any) => item.id === id);
            if (found) setItem(found);
        }

    }, [id, findByEntities]);


    if (loading) return <Loader/>

    return (
        <section
            id={id}
        >
            <b>Short info:</b> {item?.shortInfo}<br/>
            <b>Bio:</b>
            {/*<Bio>{userLoad?.bio}</Bio>*/}
            {/*<img src={`${HOST}${userLoad?.pic}`} alt="Preview"/>*/}
        </section>
    );
};

export default connect((state: RootState, ownProps: IProps) => ({
    user: state.users.entities.find((u: UserInterface) => u.id === ownProps?.id),
    findByEntities: entitiesSelector(state),
    // userLoad: userSelector(state),
    loading: loadingSelector(state)
}), {loadUser, selectedUser})(Cat)