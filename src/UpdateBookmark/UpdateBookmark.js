import React, { Component } from  'react';
import BookmarksContext from '../bookmarksContext';
import config from '../config'
import PropTypes from 'prop-types';
import './UpdateBookmark.css';

const Required = () => (
  <span className='UpdateBookmark__required'>*</span>
)

class UpdateBookmark extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = BookmarksContext;

  state = {
    error: null,
    title: '',
    url: '',
    description: '',
    rating: 1,
  };


  componentDidMount() {
    const { bookmarkId  } = this.props.match.params
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${config.API_KEY}`
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => Promise.reject(error))
      }
      return res.json()
    })
    .then(res => {
      this.setState({
        url: res.url,
        title: res.title,
        description: res.description,
        rating: res.rating,
      })
    })
    .catch(error => this.setState({ error }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { bookmarkId } = this.props.match.params
    const { title, url, description, rating } = this.state
    const newBookmark = { title, url, description, rating }
    this.setState({ error: null })
    const newJsonBookmark = JSON.stringify(newBookmark)
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: 'PATCH',
      body: newJsonBookmark,
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            Promise.reject(error)
          })
        }
        return res.json()
      })
      .then(res => {
        console.log(res)
        this.resetFields(newBookmark)
        this.context.updateBookmark(newBookmark)
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      title: newFields.title || '',
      url: newFields.url || '',
      description: newFields.description || '',
      rating: newFields.rating || '',
    })
  }

  handleCancel = () => {
    this.props.history.push('/')
  };


  render() {
    const { title, url, description, rating, error } = this.state
    return (
      <section className='UpdateBookmark'>
        <h2>Edit bookmark</h2>
        <form
          className='UpdateBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='UpdateBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <input
            type='hidden'
            name='id'
          />
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder={title}
              value={title}
              required
              onChange={(event) => this.setState({ title: event.target.value })}
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder={url}
              value={url}
              required
              onChange={(event) => this.setState({ url: event.target.value })}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              placeholder={description}
              value={description}
              onChange={(event) => this.setState({ description: event.target.value })}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              placeholder={rating}
              value={rating}
              min='1'
              max='5'
              required
              onChange={(event) => this.setState({ rating: event.target.value })}
            />
          </div>
          <div className='UpdateBookmark__buttons'>
            <button type='button' onClick={this.handleCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default UpdateBookmark
