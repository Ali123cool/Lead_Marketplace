import React from 'react';
import { Link } from 'react-router-dom';

const FormMessageLink = ({ message, linkText, linkTo }) => {
  return (
    <p className="body-primary mt-4">
      {message} 
      <Link to={linkTo} className="text-button-primary ml-2 hover:underline">
        {linkText}
      </Link>
    </p>
  );
};

export default FormMessageLink;
