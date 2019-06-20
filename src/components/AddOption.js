import React from 'react';

const AddOption = ({ error, handleSubmit, options }) => {
  return (
    <div className='pin'>
      {error && <p className='add-option-error'>{error}</p>}
      {!options.length && <p className='widget-body'>Please add an option to get started!</p>}
      <form className='add-option' onSubmit={handleSubmit}>
        <input text='text' name='option' placeholder='Type a message'/>
        <button className='button'>Add option</button>
      </form>
    </div>
  );  
};

export default AddOption;