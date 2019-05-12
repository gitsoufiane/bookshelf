/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {useAsync} from 'react-async'
import * as booksClient from '../utils/books'
import BookRow from '../components/book-row'
import {BookListUL, Spinner} from '../components/lib'

function DiscoverBooksScreen() {
  const queryRef = React.useRef()
  const {data, isPending, isRejected, error, run} = useAsync({
    deferFn: booksClient.search,
    initialValue: {books: []},
  })
  const {books} = data

  function handleSearchClick(e) {
    e.preventDefault()
    run(queryRef.current.value)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchClick}>
          <input
            ref={queryRef}
            placeholder="Search books..."
            id="search"
            css={{width: '100%'}}
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                css={{
                  border: '0',
                  position: 'relative',
                  marginLeft: '-35px',
                  background: 'transparent',
                }}
              >
                {isPending ? (
                  <Spinner />
                ) : isRejected ? (
                  <FaTimes aria-label="error" css={{color: 'red'}} />
                ) : (
                  <FaSearch aria-label="search" />
                )}
              </button>
            </label>
          </Tooltip>
        </form>

        {isRejected ? (
          <div style={{color: 'red'}}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        <br />
        <BookListUL>
          {books.map(book => (
            <li key={book.id}>
              <BookRow key={book.id} book={book} />
            </li>
          ))}
        </BookListUL>
      </div>
    </div>
  )
}

export default DiscoverBooksScreen