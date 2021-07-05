import React, { Component } from 'react';

class Search extends Component {
    state = {
        search: ""
    }

    handleSearchChange = (event) => {
        const searchValue = event.target.value;
        this.setState(() => ({
            search: searchValue
        }));
        this.searchBooks(searchValue)
    }

    searchBooks = (searchValue) => {
        this.props.searchBooks(searchValue)
    }
    render() {
        const {search} = this.state;
        return (
            <div className="search-books-input-wrapper">
                <form>
                    <input onChange={this.handleSearchChange} value={search} type="search" placeholder="Search by title or author" />
                </form>
            </div>
        );
    }
}

export default Search;