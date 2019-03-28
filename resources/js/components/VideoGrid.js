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
        const list = this.props.videos;
        const listItems = list.map((item) =>
            <li key={item.id} className="cards__item">
                <div className="card">
                    <img className="card__image card__image--fence" src={item.thumbnail}/>
                    <div className="card__content">
                        <p className='card__text'
                           onMouseEnter={this.handleMouseEnter}
                           onMouseLeave={this.handleMouseLeave}>
                                <button onMouseLeave={this.handleMouseLeave}
                                        className='edit-invisible'
                                        value={item.id}
                                        onClick={this.props.editModalOpen}>Edit</button>
                            {item.title}</p>
                        <button value={item.id}
                                onClick={this.props.delete}
                                className="btn btn--block card__btn">Delete</button>
                    </div>
                    {listItems}
                </div>
            </li>
        );

        return (
            <ul className="cards">
                {listItems}
            </ul>
        )
    }
}

export default VideoGrid;
