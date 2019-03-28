import React from 'react';
import ReactModal from 'react-modal';

import Videos from './VideoGrid';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.references = {};

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpenModal(e) {
        e.preventDefault();
        this.setState({
            modal: true
        });
    }

    handleCloseModal(e) {
        e.preventDefault();
        this.setState({
            modal: false
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('title', this.references.title.value);
        data.append('descr', this.references.descr.value);
        data.append('tags', this.references.tags.value);
        data.append('video', this.references.video.files[0]);

        this.setState({
            modal: false
        });
        this.props.upload(data);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <button onClick={this.handleOpenModal} className='upload'>+</button>
                    <Videos videos={this.props.list}
                            delete={this.props.delete}
                            upload={this.props.upload}/>
                </div>
                <ReactModal
                    isOpen={this.state.modal}
                    className='react-modal'
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.handleCloseModal}
                    style={customStyles}
                >
                    <form className='upload-form' onSubmit={this.handleSubmit}>
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
