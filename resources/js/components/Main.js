import React from 'react';
import ReactModal from 'react-modal';

import Videos from './VideoGrid';
import Categories from './Helpers/Categories';
import Privacy from './Helpers/Privacy';

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
        data.append('category', this.references.categoryUpload.value);
        data.append('privacy', this.references.privacyUpload.value);
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
            category: this.references.categoryEdit.value,
            privacy: this.references.privacyEdit.value
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
                    <div className='button-group-between'>
                        <button onClick={this.handleUploadModalOpen} className='upload'>+</button>
                        <a href='/youtube/auth' className='auth'>Авторизоваться</a>
                    </div>
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
                            <label>Category
                                <select ref={input => this.references.categoryUpload = input}>
                                    <Categories/>
                                </select>
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>Privacy
                                <select ref={input => this.references.privacyUpload = input}>
                                    <Privacy/>
                                </select>
                            </label>
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
                        <div className='form-group'>
                            <label>Category
                                <select ref={input => this.references.categoryEdit = input}>
                                    <Categories/>
                                </select>
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>Privacy
                                <select ref={input => this.references.privacyEdit = input}>
                                    <Privacy/>
                                </select>
                            </label>
                        </div>
                        <button type='submit'>Edit</button>
                    </form>
                </ReactModal>
                <div className='pagination'>
                    <button disabled={this.props.prevPageToken ? '' : 'disabled'} onClick={this.props.getList.bind(this, this.props.prevPageToken)}>&#60;</button>
                    <button disabled={this.props.nextPageToken ? '' : 'disabled'} onClick={this.props.getList.bind(this, this.props.nextPageToken)}>&#62;</button>
                </div>
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
