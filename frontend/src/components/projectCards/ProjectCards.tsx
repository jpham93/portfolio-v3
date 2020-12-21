import React from 'react';
import './ProjectCards.scss';
import { NavLink } from 'react-router-dom';
import ProjectCardsPropsModel from '../../models/ProjectCardsProps.model';
import validateColor from 'validate-color';

const ProjectCards = ({ projectCardsProps }: { projectCardsProps: ProjectCardsPropsModel[]}) => {

  const Cards = projectCardsProps.map((projectCard, index) => {
    console.log(projectCard);
    const { title, project_category: { type, color } } = projectCard;

    let backgroundStyle = {};

    if (projectCard.main_img) {
      backgroundStyle = { backgroundImage: `url(${process.env.REACT_APP_API_URL}${projectCard.main_img.url})` };
    } else if (validateColor(color)) {
      backgroundStyle = { backgroundColor: color };
    }

    return (
      <NavLink key={ index } to="/" className="ProjectCard p-md-4 p-col-12">
        <div className="ProjectCardImg" style={ backgroundStyle } />
        <span className="ProjectCardCategory">{ type }</span>
        <span className="ProjectName">{ title }</span>
      </NavLink>
    );
  });

  return (
    <div className="p-grid ProjectCards">
      { Cards }
    </div>
  );
}

export default ProjectCards;
