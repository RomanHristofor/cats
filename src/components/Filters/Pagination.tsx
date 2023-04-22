import React, {Component} from 'react'
import Pagination from 'react-js-pagination'
import {connect} from 'react-redux'
import {changePages} from '../../AC'
import {entitiesSelector, userNameSelector, paginationSelector, RootState} from '../../selectors'
import {UserInterface} from '../../reducer/users'
import {StateFiltersInterface} from '../../reducer/filters'

type Props = {
    users: UserInterface[]
    changePages: Function
} & StateFiltersInterface

class PaginationFilter extends Component<Props, any> {

    handlePageChange = (page: number) => {
        const {changePages, pagination} = this.props;
        changePages({
            page: page,
            pageSize: pagination.pageSize
        })
    }

    render() {
        const {users, userName, pagination} = this.props;
        let countFiltratedByName = 0;

        if (userName) {
            countFiltratedByName = users.filter(item => {
                return item.name.toLowerCase().includes(userName.toLowerCase())
            }).length;
        }

        const total = !userName ? users.length : countFiltratedByName;

        return (
            <div>
                <></>
                <Pagination
                    activePage={pagination.page}
                    itemsCountPerPage={pagination.pageSize}
                    totalItemsCount={total <= 0 ? 1 : total}
                    onChange={this.handlePageChange}
                />
            </div>
        );
    }
}

export default connect((state: RootState) => ({
    users: entitiesSelector(state),
    userName: userNameSelector(state),
    pagination: paginationSelector(state),
}), {changePages})(PaginationFilter)