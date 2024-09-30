import React from 'react';

const FormMessage = ({ message, type = 'success' }) => {
  const messageStyle = type === 'error' ? 'text-red-500' : 'text-green-500';
  return <p className={`text-center my-4 ${messageStyle}`}>{message}</p>;
};

export default FormMessage;
