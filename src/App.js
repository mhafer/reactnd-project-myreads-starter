import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import BookSearch from './components/BookSearch'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    filteredList: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
        books: books
      })
    })
  }

  resetSearchView = () => {
    this.setState({ filteredList: [] });
  }

  getFilteredBooks = (query) => {
    (query.length === 0)
    ? this.setState({ filteredList: [] })
    : BooksAPI.search(query)
      .then((searchResults) => {
        if (!searchResults.error) {
          searchResults.length > 0 && searchResults.map((result) => {
            const foundOnShelf = this.state.books.find((myBooks) => myBooks.id === result.id)
            return result.shelf = foundOnShelf ? foundOnShelf.shelf : result.shelf;
          })
          this.setState({ filteredList: searchResults });
        } else {
          this.setState({ filteredList: [] });
        }
      })
  }

  handleBookStatusChange = (bId, status, fromSearch) => {
    BooksAPI.get(bId)
    .then((foundBook) => {
      BooksAPI.update(foundBook, status)
      .then((book) => {
        foundBook.shelf = status;
        this.setState((prevStat)  => ({
          books: prevStat.books.filter((existing) =>  existing.id !== bId).concat([foundBook])
        }));
        if(fromSearch){
          const replaceIdx = this.state.filteredList.findIndex((existingBook) =>  existingBook.id === bId )
          let temp =  this.state.filteredList;
          if(replaceIdx !== -1){
            temp[replaceIdx] = foundBook;
          }
          this.setState((prevStat)  => ({
            filteredList: temp
          }));
        }
      })
    })   
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf
            books={this.state.books}
            handleChangeBookShelf={this.handleBookStatusChange}          
          />)} 
        />
        <Route path='/search' render={({ history }) => (
          <BookSearch
            filteredList={this.state.filteredList}
            onSearch={this.getFilteredBooks}
            handleChangeBookShelf={this.handleBookStatusChange}
            resetList={this.resetSearchView} 
          />)} 
        />
      </div>
    )
  }
}
export default BooksApp