import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

const options = [
  {
    key: "currentlyReading",
    title: "Currently Reading"
  },
  {
    key: "wantToRead",
    title: "Want To Read"
  },
  {
    key: "read",
    title: "Read"
  },
]

const BookShelf = (props) => {

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {options.map((option) => {
          return(
            <Shelf
              key={option['key']}
              bookList={props.books ? props.books.filter((book) => book.shelf === option['key']) : []}
              shelfTitle={option['title']}
              handleChange={props.handleChangeBookShelf}
            />
          )
        })}      
      </div>
      <Link className='open-search' to={{ pathname: '/search' }}>
       <button>Add</button> 
      </Link>
    </div>
  )  
}
export default BookShelf