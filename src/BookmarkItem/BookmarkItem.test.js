import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkItem from './BookmarkItem';

const props = {
  title: '',
  url: 'https://placeholderurl.com',
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookmarkItem title={props.title} url={props.url}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
