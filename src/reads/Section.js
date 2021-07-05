import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import Loading from '../Loading';

import * as BooksAPI from '../BooksAPI'

const shelfs = ["currentlyReading","wantToRead","read","none"];
class Section extends Component {
    state = {
        loading: true,
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(response => {
            const books = response;
            this.setBooks(books)
        })
    }
    
    getBooksByShelf= (books) => {
        let shelfBookMap = {currentlyReading: [],wantToRead: [],read: []}
        for(let i = 0; i < books.length; i ++){
            const book = books[i]
            const currentShelf = book['shelf'];
            if(currentShelf !== shelfs[3]) {
                shelfBookMap[currentShelf].push(book)
            }
        }
        return shelfBookMap;
    }

    handleChangeBookShelf = (id,value) => {
        BooksAPI.update(id,value).then((response) => {
            this.setState(prevState => 
                ({
                books: prevState.books.map(el => 
                    (el.id === id ? {...el, shelf: value } : el))
                }))
        })
    }

    setBooks = (books) => {
        this.setState(() => ({
            books: books,
            loading: false
        }))
    }
    render() {
        const { loading,books } = this.state;
        const shelfBooks = this.getBooksByShelf(books)
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {loading
                        ? <Loading></Loading>
                        : <div>
                            {Object.keys(shelfBooks).map(shelf => (
                                <BookShelf 
                                    key = {shelf} 
                                    books = {shelfBooks[shelf]}  
                                    shelf={shelf}
                                    changeBookShelf = {this.handleChangeBookShelf}></BookShelf>
                            ))}
                        </div>
                    }

                </div>
                <div className="open-search">
                    <Link to="/search"><button>Add a book</button></Link>
                </div>
            </div>
        );
    }
}

export default Section;