import React from 'react';
import './ProjectCards.scss';
import { NavLink } from 'react-router-dom';
import ProjectCardsPropsModel from '../../models/ProjectCardsProps.model';

const ProjectCards = ({ projectCardsProps }: { projectCardsProps: ProjectCardsPropsModel[]}) => {

  const Cards = projectCardsProps.map(projectCard => {
      return (
        <NavLink to="/" className="ProjectCard">
          <div className="ProjectCardImg" />
          <span className="Category">Category</span>
          <span className="ProjectName">Project Name</span>
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
