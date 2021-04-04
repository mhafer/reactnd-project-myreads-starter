import React from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem';

class BookSearch extends React.Component {

  componentWillUnmount() {
    this.props.resetList()
  }

  handleChange = (event) => {
    event.preventDefault();
    this.props.onSearch(event.target.value);
  }

  handleChangeBookStatus = (event) => {
    event.preventDefault();
    this.props.handleChangeBookShelf(event.target.id, event.target.value, true);
  }

  render() {
    const list = this.props.filteredList || [];
    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={{ pathname: '/' }}>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={this.handleChange}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {list.length > 0 && list.map((book) => {
            const currShelf = book.shelf ? book.shelf : 'none';
            const img = book.imageLinks 
            ? book.imageLinks.smallThumbnail 
            : 'http://via.placeholder.com/128x193?'
              return(
                <BookItem
                  key={book.id}
                  bookId={book.id}
                  img={img}
                  shelf={currShelf}
                  bookTitle={book.title}
                  bookAuthors={book.authors}
                  onChange={this.handleChangeBookStatus}
                />)
          })}
        </ol>
      </div>
    </div>
    )
  }
}
export default BookSearch