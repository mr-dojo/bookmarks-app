import React from 'react';
import Rating from '../Rating/Rating';
import config from '../config';
import BookmarksContext from '../bookmarksContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './BookmarkItem.css';

function deleteBookmarkRequest(bookmarkId, callback) {
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
            <Link to={`/edit/${props.id}`}>Edit Bookmark</Link>
            {' '}
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

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}

BookmarkItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  desciption: PropTypes.string,
  rating: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func,
}

// BookmarkItem.propTypes = {
//   title: PropTypes.string.isRequired,
//   url: (props, propName, componentName) => {
//     const prop = props[propName];
//     if (!prop) {
//       return new Error(`"${componentName}" component requires a "${propName}" prop`)
//     }
//     if (typeof prop != 'string') {
//       return new Error(`Invalid prop, "${propName}" is expecting a string for the "${componentName}" component`)
//     }
//     if (prop.length <= 5 || !prop.match(new RegExp(/^https?:\/\//))) {
//       return new Error(`Invalid prop, "${propName}" must be min length 5 and begin http(s)://. Validation Failed.`);
//     }
//   },
//   rating: PropTypes.number,
//   description: PropTypes.string
// };

// BookmarkItem.defaultProps = {
//   rating: 1,
//   description: "",
// };
