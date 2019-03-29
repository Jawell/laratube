import React from 'react';

class Privacy extends React.Component {
    render() {
        return(
            <React.Fragment>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="unlisted">Unlisted</option>
            </React.Fragment>
        )
    }
}

export default Privacy;
