import React from 'react';
import './Loading.module.scss';
import { ProgressSpinner } from 'primereact/progressspinner';
import Header from '../header/Header';

const Loading = ({ headerType, initLoad }: { headerType: 'default' | 'large', initLoad?: boolean }) => {

  return (
    <div className="LoadingComponent">
      <Header title={{ text: ' ', style: "default" }} headerType={ headerType } />
      <div className="LoadingComponentContent" style={{
        height: headerType === 'large'
                  ? 'calc(var(--page-content-min-height-large-header) + var(--menu-height)*2 + var(--header-height-large))'
                  : 'calc(var(--page-content-min-height-default) + var(--menu-height)*2 + var(--header-height-default))',
        backgroundColor: initLoad ? 'transparent' : 'inherit'
      }}>
        <ProgressSpinner className="Spinner"/>
        <h2>Loading. Please Wait...</h2>
      </div>
    </div>
  );
}

export default Loading;
