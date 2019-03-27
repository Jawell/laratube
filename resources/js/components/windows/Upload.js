import React from 'react';
import Axios from 'axios';

class Upload extends React.Component {
    constructor(props) {
        super(props);

        this.references = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('title', this.references.title.value);
        data.append('descr', this.references.descr.value);
        data.append('tags', this.references.tags.value);
        data.append('video', this.references.video.files[0]);

        console.log(data);

        Axios.post('/api/upload', data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input ref={input => this.references.title = input} type='text' name='title' placeholder='title'/>
                <input ref={input => this.references.descr = input} type='text' name='description' placeholder='descr'/>
                <input ref={input => this.references.tags = input} type='text' name='tags' placeholder='tags'/>
                <input ref={input => this.references.video = input} type='file' name='video'/>
                <button type='submit'>Upload</button>
            </form>
        );
    }
}

export default Upload;
