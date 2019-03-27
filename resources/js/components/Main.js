import React from 'react';
import ReactModal from 'react-modal';

import "react-table/react-table.css";
import Table from "react-table";

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
            <div>
                <button onClick={this.handleOpenModal} className='upload'>+</button>
                <Table data={this.props.list}
                       defaultPageSize={10}
                       loading={this.props.loading}
                       className="-highlight react-table"
                       columns={[
                           {
                               Header: "Data",
                               columns: [
                                   {
                                       Header: "Preview",
                                       accessor: "thumbnail",
                                       sortable: false,
                                       Cell: props => {
                                           return (
                                               <img className='table-preview' src={props.value}/>
                                           )

                                       }
                                   },
                                   {
                                       Header: "Title",
                                       accessor: "title",
                                       width: 400
                                   },
                               ]
                           },
                           {
                               Header: "Actions",
                               columns: [
                                   {
                                       accessor: "id",
                                       sortable: false,
                                       Cell: props => {
                                           return (
                                               <React.Fragment>
                                                   <button onClick={this.props.delete} value={props.value}>Delete
                                                   </button>
                                                   <button>Modify</button>
                                               </React.Fragment>
                                           )
                                       }
                                   },
                               ]
                           },
                       ]}
                />
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
            </div>

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
