import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.notify = this.notify.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    notify(message, state) {
        toast(<div><p style={{margin: "0"}}>{message}</p></div>, {
            type: state,
            position: "top-right"
        })
    }

    render() {
        return(
            <ToastContainer/>
        )
    }
}

export default Notice;
