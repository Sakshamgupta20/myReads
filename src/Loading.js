import React from 'react';
import loadingImg from './icons/loading.gif';
import searchImg from './icons/search.gif';
import PropTypes from 'prop-types'

function Loading(props) {
    const{search} = props

    return(
        <div className = "loading-container">
            <img style ={{margin: 'auto',height: '50vh'}} src={search ? searchImg : loadingImg} alt="loading" />
            <p>Please wait while fetching books...</p>
        </div>
    )
}

Loading.propTypes = {
    search: PropTypes.bool
};

export default Loading;