import React, {Component} from 'react'
import {connect} from 'react-redux'
import {inputFiltratedByName} from '../../AC'
import {RootState, userNameSelector} from '../../selectors'

type Props = {
    userName: string
    inputFiltratedByName: (v: string) => void
}

class Input extends Component<Props> {

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.target.value;
        if (str.length < 30)
            this.props.inputFiltratedByName(str);
    }

    render() {
        const {userName} = this.props;
        return (
            <div>
                <label>
                    <input
                        type='text'
                        value={userName}
                        placeholder={userName || `Filter by name`}
                        onChange={this.handleChange}/>
                </label>
            </div>
        )
    }

}

export default connect((state: RootState) => ({
    userName: userNameSelector(state),
}), {inputFiltratedByName})(Input)