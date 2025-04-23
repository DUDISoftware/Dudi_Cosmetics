import React from 'react';

const Input = ({
  name = '',
  className = '',
  label = '',
  type = 'text',
  placeholder = '',
  value = '',
  onChange = () => null,
  onKeyDown,
  isRequired = true,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={`shadow appearance-none rounded border w-full py-2 px-3 bg-[#FFF6F4] text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        id={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        type={type}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
};

export default Input;
