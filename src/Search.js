import React, {Component} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";
import Book from "./Book";

class Search extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeBookshelf: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired
  };

  updateQuery = (query) => {
    this.props.updateQuery(query.trim());
  };

  componentWillUnmount(){
    // Reset query
    this.props.updateQuery("");
  }

  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="800" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id} className="contact-list-item">
                <Book
                  book={book}
                  changeBookshelf={this.props.changeBookshelf} />
              </li>
            ))}
            {this.props.books.length === 0 && (
              <div class="contact-list-item">
                <h4>Search did not return any books. Please fix or run a query.</h4>
              </div>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;