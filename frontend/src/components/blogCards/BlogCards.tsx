import React from 'react';
import './BlogCards.module.scss';
import BlogCardsPropsModel from '../../models/BlogCardsProps.model';
import { NavLink } from 'react-router-dom';
import validateColor from 'validate-color';
import moment from 'moment';

const BlogCards = ({ blogCardsProps }: { blogCardsProps: BlogCardsPropsModel[] }) => {

  const cards = blogCardsProps.map((blogCard, index) => {

    const { title, blog_category: { type, color }, main_img, date, description } = blogCard;

    let backgroundStyle = {};
    if (main_img) {
      backgroundStyle = { backgroundImage: `url(${process.env.REACT_APP_API_URL}${blogCard.main_img.url})` };
    } else if (validateColor(color)) {
      backgroundStyle = { backgroundColor: color };
    }

    // format date w/ moment i.e. Jun 26, 2020
    const formattedDate = moment(date).format('MMM D, YYYY');

    return (
      <NavLink className="BlogCard p-md-4 p-col-12" to={ `/blog/${blogCard.blog_id}` } key={ index }>
        <div className="BlogCardImgWrapper">
          <div className="BlogCardImg" style={ backgroundStyle } />
          <span className="BlogDate">{ formattedDate }</span>
          <span className="BlogCardCategory">{ type }</span>
        </div>
        <span className="BlogName">{ title }</span>
        <span className="BlogDescription">{ description }</span>
      </NavLink>
    );
  });

  return (
    <div className="p-grid BlogCards">
      { cards }
    </div>
  );
}

export default BlogCards;
