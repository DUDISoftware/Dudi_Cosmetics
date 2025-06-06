import React from 'react';

const Button = ({
  icon = '',
  label = '',
  className = '',
  onClick = () => {},
}) => {
  return (
    <button onClick={onClick} className={`bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded ${className}`}>
      {icon}{label}
    </button>
  );
};

export default Button;
