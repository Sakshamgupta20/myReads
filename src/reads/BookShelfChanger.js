import React, { Component } from 'react';
import PropTypes from 'prop-types'
const options = [{name:"Currently Reading",value: "currentlyReading"},
{name:"Want to Read",value: "wantToRead"},
{name:"Read",value: "read"},
{name:"None",value: "none"}]
class BookShelfChanger extends Component {
    state = {
        value: ""
    }
    
    handleSelectValueChange = (event) => {
        const value = event.target.value;
        this.setState({
            value: value
        })
        this.props.changeShelf(value);
    }
    render() {
        const {shelf} = this.props;
        return (
            <div className="book-shelf-changer">
                <select value = {shelf} onChange = {this.handleSelectValueChange}>
                    <option value="" disabled>Move to...</option>
                    {options.map(option => (
                        <option 
                        className={shelf === option.value ? "book-shelf-changer-option" : ""} 
                        key={option.value} 
                        value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}

BookShelfChanger.propTypes = {
    shelf: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired
};

export default BookShelfChanger;