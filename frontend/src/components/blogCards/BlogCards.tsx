import React from 'react';
import './BlogCards.scss';
import BlogCardsPropsModel from '../../models/BlogCardsProps.model';

const BlogCards = ({ blogCardsProps }: { blogCardsProps: BlogCardsPropsModel[] }) => {

  console.log(blogCardsProps);

  return (
    <>
      <h1>BlogCards</h1>
    </>
  );
}

export default BlogCards;
