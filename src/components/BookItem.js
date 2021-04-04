import React from 'react';

const BookItem = (props) => {

  return(<li key={props.bookId}>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.img})` }} />
        <div className="book-shelf-changer">
          <select 
            id={props.bookId}
            value={props.shelf}
            onChange={props.onChange}
          >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">{(props.shelf !== 'move'  && props.shelf !== 'none') ? 'Remove from MyBooks' : 'None'}</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.bookTitle}</div>
      <div className="book-authors">{props.bookAuthors 
      ? props.bookAuthors.map((author) => <div key={author} className="book-authors">{author}</div>) 
      : ''}</div>
    </div>
  </li>)
}
export default BookItem