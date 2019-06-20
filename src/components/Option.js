import React from 'react';

export default Option = ({ optionText, index, handleDeleteOption }) => {
  return (
    <li className='option'>
      <p>{`${index}. ${optionText}`}</p>
      <button className='button--link' onClick={(e) => {
        handleDeleteOption(optionText);
      }}>X</button>
    </li>
  );
};