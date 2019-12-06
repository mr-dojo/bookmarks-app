import React from 'react';
import Rating from '../Rating/Rating';
import config from '../config';
import BookmarksContext from '../bookmarksContext';
import PropTypes from 'prop-types';
import './BookmarkItem.css';

function deleteBookmarkRequest(bookmarkId, callback) {
  console.log(config.API_ENDPOINT + `/${bookmarkId}`)
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, { 
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {throw error})
      }
      return res.json()
    })
    .then(data => {
      callback(bookmarkId)
    })
    .catch(error => console.error(error))
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context => (
        <li className='BookmarkItem'>
          <div className='BookmarkItem__row'>
            <h3 className='BookmarkItem__title'>
              <a
                href={props.url}
                target='_blank'
                rel='noopener noreferrer'>
                {props.title}
              </a>
            </h3>
            <Rating value={props.rating} />
          </div>
          <p className='BookmarkItem__description'>
            {props.description}
          </p>
          <div className='BookmarkItem__buttons'>
            <button
              className='BookmarkItem__description'
              onClick={() => {
                deleteBookmarkRequest(
                  props.id,
                  context.deleteBookmark,
                  )
                }
              }
            >
              Delete
            </button>
          </div>
        </li>
      )
    )}
    </BookmarksContext.Consumer>
  )
}

BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string
};

BookmarkItem.defaultProps = {
  rating: 1,
  description: ""
};
