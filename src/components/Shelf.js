import React from 'react';
import BookItem from './BookItem';

const Shelf = (props) => {

  const handleChangeBookStatus = (event) => {
    event.preventDefault();
    props.handleChange(event.target.id, event.target.value, false);
  }
  
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {props.bookList.map((book) => {
          const img = book.imageLinks 
          ? book.imageLinks.smallThumbnail 
          : 'http://via.placeholder.com/128x193?'
          return(
            <BookItem
              key={book.id}
              bookId={book.id}
              img={img}
              shelf={book.shelf}
              bookTitle={book.title}
              bookAuthors={book.authors}
              onChange={handleChangeBookStatus}
            />)
        })}
      </ol>
    </div>
  </div>
  )  
}
export default Shelf