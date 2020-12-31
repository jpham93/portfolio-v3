import React from 'react';
import './Loading.scss';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = () => {
  return (
    <div className="LoadingComponent">
      <ProgressSpinner className="Spinner"/>
      <h2>Loading. Please Wait...</h2>
    </div>
  );
}

export default Loading;
