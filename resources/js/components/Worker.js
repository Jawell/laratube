import React from 'react';
import Notice from './Notice';
import Axios from 'axios';

import Main from './Main';

class Worker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            list: []
        };

        this.getList = this.getList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.upload = this.upload.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        this.getList();
    }

    handleDelete(e) {
        e.preventDefault();
        this.notice.notify('Try to deleting...', 'info');
        const id = e.target.value;
        Axios.delete(`/api/delete/${id}`)
            .then( response => {
                this.notice.notify('Video is deleted! Wait for youtube service', 'success');
                this.getList();
            })
            .catch(error => {
                this.notice.notify('Error. Maybe video does not exist', 'error');
            });
    }

    getList() {
        Axios.get('/api/videos')
            .then(response => {
                this.setState({
                    loading: false,
                    list: response.data
                });
            })
            .catch(error => {
                this.setState({
                    loaded: false,
                });
            })
    }

    upload(data) {
        this.notice.notify('Try to uploading...', 'info');
        Axios.post('/api/upload', data)
            .then(response => {
                this.notice.notify('Video is uploaded!  Wait for youtube service', 'success');
                this.getList();
            })
            .catch(error => {
                this.notice.notify('Oooops', 'error');
            });
    }

    edit(data) {
        this.notice.notify('Try to edit...', 'info');
        Axios.patch('/api/edit', data)
            .then(response => {
                this.notice.notify('Title changed!! Wait for youtube service', 'success');
                this.getList();
            })
            .catch(error => {
                this.notice.notify('Oooops', 'error');
            });
    }

    render() {
        return(
            this.state.loading ? <p>Loading</p> :
            <React.Fragment>
                <Notice onRef={ref => (this.notice = ref)}/>
                <Main list={this.state.list}
                      delete={this.handleDelete}
                      upload={this.upload}
                      edit={this.edit}/>
            </React.Fragment>
        )
    }
}

export default Worker;
