import React from 'react';
import './Loading.scss';
import { ProgressSpinner } from 'primereact/progressspinner';
import Header from '../header/Header';

const Loading = ({ headerType }: { headerType: 'default' | 'large' }) => {

  return (
    <div className="LoadingComponent">
      <Header title={{ text: ' ', style: "default" }} headerType={ headerType } />
      <ProgressSpinner className="Spinner"/>
      <h2>Loading. Please Wait...</h2>
    </div>
  );
}

export default Loading;
