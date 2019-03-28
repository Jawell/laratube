import React from 'react';
import ReactModal from 'react-modal';

import Videos from './VideoGrid';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadModal: false,
            editModal: false,
            videoId: ''
        };

        this.references = {};

        this.handleUploadModalOpen = this.handleUploadModalOpen.bind(this);
        this.handleUploadModalClose = this.handleUploadModalClose.bind(this);
        this.handleEditModalOpen = this.handleEditModalOpen.bind(this);
        this.handleEditModalClose = this.handleEditModalClose.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleUploadModalOpen(e) {
        e.preventDefault();
        this.setState({
            uploadModal: true
        });
    }

    handleUploadModalClose(e) {
        e.preventDefault();
        this.setState({
            uploadModal: false
        });
    }

    handleEditModalOpen(e) {
        e.preventDefault();
        this.setState({
            editModal: true,
            videoId: e.target.value
        });
    }

    handleEditModalClose(e) {
        e.preventDefault();
        this.setState({
            editModal: false,
            videoId: ''
        });
    }

    handleUpload(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('title', this.references.title.value);
        data.append('descr', this.references.descr.value);
        data.append('tags', this.references.tags.value);
        data.append('video', this.references.video.files[0]);

        this.setState({
            uploadModal: false
        });
        this.props.upload(data);
    }

    handleEdit(e) {
        e.preventDefault();

        const data = {
            id: this.state.videoId,
            title: this.references.edit.value,
            category: this.references.category.value
        };

        this.setState({
            editModal: false
        });
        this.props.edit(data);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <button onClick={this.handleUploadModalOpen} className='upload'>+</button>
                    <Videos videos={this.props.list}
                            delete={this.props.delete}
                            upload={this.props.upload}
                            changeTitle={this.props.changeTitle}
                            editModalOpen={this.handleEditModalOpen}
                            editModalClose={this.handleEditModalClose}/>
                </div>
                <ReactModal
                    isOpen={this.state.uploadModal}
                    className='react-modal'
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.handleUploadModalClose}
                    style={customStyles}
                >
                    <form className='upload-form' onSubmit={this.handleUpload}>
                        <div className='form-group'>
                            <label>Title<input ref={input => this.references.title = input} type='text' name='title' autoComplete='off'/></label>
                        </div>
                        <div className='form-group'>
                            <label>Description<input ref={input => this.references.descr = input} type='text' name='description' autoComplete='off'/></label>
                        </div>
                        <div className='form-group'>
                            <label>Tags<input ref={input => this.references.tags = input} type='text' name='tags' autoComplete='off'/></label>
                        </div>
                        <div className='form-group'>
                            <label>Video<input ref={input => this.references.video = input} type='file' name='video'/></label>
                        </div>
                        <button type='submit'>Upload</button>
                    </form>
                </ReactModal>
                <ReactModal
                    isOpen={this.state.editModal}
                    className='react-modal'
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.handleEditModalClose}
                    style={customStyles}
                >
                    <form className='upload-form' onSubmit={this.handleEdit}>
                        <div className='form-group'>
                            <label>Title<input ref={input => this.references.edit = input} type='text' name='edit' autoComplete='off'/></label>
                        </div>
                        <div>
                            <select ref={input => this.references.category = input}>
                                <option value="2">Cars & Vehicles</option>
                                <option value="23">Comedy</option>
                                <option value="27">Education</option>
                                <option value="24">Entertainment</option>
                                <option value="1">Film & Animation</option>
                                <option value="20">Gaming</option>
                                <option value="26">How-to & Style</option>
                                <option value="10">Music</option>
                                <option value="25">News & Politics</option>
                                <option value="29">Non-profits & Activism</option>
                                <option value="22">People & Blogs</option>
                                <option value="15">Pets & Animals</option>
                                <option value="28">Science & Technology</option>
                                <option value="17">Sport</option>
                                <option value="19">Travel & Events</option>
                            </select>
                        </div>
                        <button type='submit'>Edit</button>
                    </form>
                </ReactModal>
            </React.Fragment>

        );
    }
}

ReactModal.setAppElement('#root');
const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid black',
        padding: '20px',
        borderRadius: '4px',
        background: '#fff'
    }
};
export default Main;
