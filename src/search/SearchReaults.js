import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookSection from '../reads/BookShelf'
import Loading from '../Loading';
import Search from './Search';
import * as BooksAPI from '../BooksAPI'

let userBooks = [];
class SearchResults extends Component {
    state = {
        loading: false,
        books: [],
        currentSearch: ""
    }

    componentDidMount() {
        BooksAPI.getAll().then(response => {
            userBooks = response;
        })
    }

    handelSearchBooks = (searchValue) => {

        if (searchValue.trim() === "") {
            this.setBookState([], false, searchValue)
            return;
        } else {
            this.setBookState([], true, searchValue)
        }

        BooksAPI.search(searchValue).then(response => {
            let books = [];
            if (!response.error) {
                books = response;
                //Map User books with search results
                //I think this mapping should be done in server level
                for (let i = 0; i < books.length; i++) {
                    let book = books[i];
                    const userBookIndex = userBooks.findIndex(userBook => userBook.id === book.id);
                    if (userBookIndex !== -1) {
                        book.shelf = userBooks[userBookIndex].shelf;
                    } else {
                        book.shelf = "none"
                    }
                }
            }
            this.setState(() => ({
                loading: false,
                books: books
            }))
        })

    }

    handleChangeBookShelf = (id, value) => {
        BooksAPI.update(id, value).then((response) => {
            this.setState(prevState =>
            ({
                books: prevState.books.map(el =>
                    (el.id === id ? { ...el, shelf: value } : el))
            }))
            let userBookIndex = userBooks.findIndex(userBook => userBook.id === id)
            
            //Add/Update user section book
            if(userBookIndex !== -1) {
                userBooks[userBookIndex].shelf = value
            } else {
                let userBook = this.state.books.find(book => book.id === id);
                userBook.shelf = value;
                userBooks.push(userBook)
            }
        })
    }

    setBookState = (books, loading, search) => {
        this.setState(() => ({
            loading: loading,
            books: books,
            currentSearch: search
        }))
    }
    render() {
        const { books, loading, currentSearch } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <Search searchBooks = {this.handelSearchBooks}></Search>
                </div>
                <div className="search-books-results">
                    {!loading && currentSearch &&
                        <BookSection
                            changeBookShelf={this.handleChangeBookShelf}
                            books={books}>
                        </BookSection>
                    }
                    {loading && <Loading search={true}></Loading>}
                    {(!loading && !currentSearch) && <h2 style={{ color: 'red', textAlign: 'center' }}>SEARCH SOMETHING!</h2>}
                </div>
            </div>
        );
    }
}

export default SearchResults;