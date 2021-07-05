import React from 'react';
import PropTypes from 'prop-types';
import emptyImage from '../icons/empty-book.png'
import BookShelfChanger from './BookShelfChanger';

function Book(props) {
    const { title, authors, shelf, imageLinks } = props.book;

    const getImageThumbnail = (imageLinks) => {
        if (!imageLinks || Object.keys(imageLinks).length === 0) {
            return emptyImage
        }
        return imageLinks.smallThumbnail || imageLinks.thumbnail
    }
    const getAuthors = (authors) => {
        if (!authors) return ""
        return authors.join(',');
    }

    const handleShelfChange = (value) => {
        props.changeBookShelf(props.book.id,value);
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${getImageThumbnail(imageLinks)})` }}></div>
                    <BookShelfChanger changeShelf = {handleShelfChange} shelf = {shelf}></BookShelfChanger>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{getAuthors(authors)}</div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
};

export default Book;