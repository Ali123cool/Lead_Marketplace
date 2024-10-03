import React from 'react';

const FormButton = ({ text = 'Submit' }) => {
  return <button className="my-2 btn-1 w-full">{text}</button>;
};

export default FormButton;
