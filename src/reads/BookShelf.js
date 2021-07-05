import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types'

function BookShelf(props) {
    const {shelf,books} = props;
    return (
        <div className="bookshelf">
            {shelf && <h2 className="bookshelf-title">{shelf.replace(/([a-z])([A-Z])/g, '$1 $2')}</h2>} {/* Split camel case with space */}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <Book
                            changeBookShelf = {(id,value) => props.changeBookShelf(id,value)}
                            key = {book.id}
                            book = {book}
                            shelf = {book.shelf}></Book>
                    ))}
                </ol>
                {(!books || books.length === 0) && <h2 style = {{color: 'red'}}>NO BOOKS FOUND!</h2>}
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    shelf: PropTypes.string,
    books: PropTypes.array.isRequired
};


export default BookShelf;