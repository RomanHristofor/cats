import React from 'react';
import { useState, useEffect } from 'react';
import {LoadUserInterface, UserInterface} from "../reducer/users";
import {connect} from "react-redux";
import {entitiesSelector, loadingSelector, RootState, userSelector} from "../selectors";
import {loadUser, selectedUser} from "../AC";
import {inverseSelected} from "../helpers";
import {Main} from './css'

interface IProps {
    entities?: UserInterface[] | any;
    id?: string,
    user?: UserInterface,
    findByEntities?: UserInterface[],
    loading?: boolean,
    userLoad?: LoadUserInterface | null,
    selectedUser?: (user: UserInterface) => void,
    loadUser?: (s: string) => void
}

const Cats = ({
  entities,
  loading,
  user,
  userLoad = null,
  findByEntities,
  selectedUser,
  loadUser,
}: IProps) => {
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const selectedItem = entities.find((item: any) => item.isSelected);
        if (selectedItem) {
            setSelectedItem(selectedItem);
        }
    }, []);

    const unSelectedPrevUser = (userId: string) => {
        if (findByEntities && findByEntities.length > 0) {
            const getUser = findByEntities.find(item => item.id === userId);
            if (getUser?.isSelected && selectedUser) {
                selectedUser(inverseSelected(getUser));
            }
        }
    }


    useEffect(() => {
        if (!loading) {
            if (selectedItem && selectedUser) { //clear selected user for History back
                console.log(selectedUser);
                selectedUser(inverseSelected(selectedItem));
            }

            if (user && !user.isSelected) { //History back
                selectedUser && selectedUser(inverseSelected(user));

                if (userLoad && user.id !== userLoad.id) {
                    unSelectedPrevUser(userLoad.id);
                }
            }
            if (user && !user.dateOfDeletion) {
                loadUser && loadUser(user.more);
            }
        }
    }, [loading, selectedItem, user]);

    return (
        <Main>
            {selectedItem}
        </Main>
    );
};

export default connect((state: RootState, ownProps: IProps) => ({
    entities: entitiesSelector(state),
    loading: loadingSelector(state),
    user: state.users.entities.find((u: UserInterface) => u.id === ownProps?.id),
    findByEntities: entitiesSelector(state),
    userLoad: userSelector(state),
}), {loadUser, selectedUser})(Cats)