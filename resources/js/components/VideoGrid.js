import React from 'react';

class VideoGrid extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter(e) {
        e.target.firstChild.className = 'edit-visible'
    }

    handleMouseLeave(e) {
        switch (e.target.tagName) {
            case 'P':
                e.target.firstChild.className = 'edit-invisible';
                break;
            case 'BUTTON':
                e.target.className = 'edit-invisible';
                break;
        }
    }

    render() {
        const list = this.props.videos[0];
        const listItems = [];
        for(const [key, val] of Object.entries(list)) {
            listItems.push(
                <li key={val.id} className="cards__item">
                    <div className="card">
                        <img className="card__image card__image--fence" src={val.thumbnail}/>
                        <div className="card__content">
                            <p className='card__text'
                               onMouseEnter={this.handleMouseEnter}
                               onMouseLeave={this.handleMouseLeave}>
                                <button onMouseLeave={this.handleMouseLeave}
                                        className='edit-invisible'
                                        value={val.id}
                                        onClick={this.props.editModalOpen}>Edit</button>
                                {val.title}</p>
                            <button value={val.id}
                                    onClick={this.props.delete}
                                    className="btn btn--block card__btn">Delete</button>
                        </div>
                    </div>
                </li>
            )
        }

        return (
            <ul className="cards">
                {listItems}
            </ul>
        )
    }
}

export default VideoGrid;
