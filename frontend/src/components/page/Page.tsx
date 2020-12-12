import React from 'react';
import Header from '../../components/header/Header';
import PagePropsModel from '../../models/PageProps.model';

const Page = ({ title, page_id, header_image, name }: PagePropsModel) => {

  // insert header props to pass onto Header component
  const headerProps = {
    title,
    header_image
  };

  return(
    <>
      <Header {...headerProps!} />
    </>
  );
};

export default Page;
