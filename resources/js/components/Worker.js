import React from 'react';

import Main from './windows/Main';
import Axios from "axios";

class Worker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            list: []
        };
        this.getList = this.getList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.getList();
    }

    handleDelete(e) {
        e.preventDefault();
        const id = e.target.value;
        Axios.delete(`/api/delete/${id}`)
            .then( response => {
                console.log(response);
                this.getList();
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    getList() {
        Axios.get('/api/videos')
            .then(response => {
                this.setState({
                    loading: false,
                    list: response.data
                });

                console.log(response.data);
            })
            .catch(error => {
                this.setState({
                    loaded: false,
                });
                console.log(error.response);
            })
    }

    upload(data) {
        Axios.post('/api/upload', data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    render() {
        return(
            <Main loading={this.state.loading}
                  list={this.state.list}
                  delete={this.handleDelete}
                  upload={this.upload}/>
        )
    }
}

export default Worker;
