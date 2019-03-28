import React from 'react';
import EditSymbol from '../../assets/edit.png';

class VideoGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const list = this.props.videos;
        const listItems = list.map((item) =>
            <li key={item.id} className="cards__item">
                <div className="card">
                    <img className="card__image card__image--fence" src={item.thumbnail}/>
                    <div className="card__content">
                        <p className="card__text"><button><img src={EditSymbol} alt='edit'/></button>{item.title}</p>
                        <button value={item.id} onClick={this.props.delete} className="btn btn--block card__btn">Delete</button>
                    </div>
                    {listItems}
                </div>
            </li>
        );

        return(
            <ul className="cards">
                {listItems}
            </ul>
        )
    }
}

export default VideoGrid;
