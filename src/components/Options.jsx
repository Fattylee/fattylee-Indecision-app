import React from 'react';
import Option from './Option';

const Options = ({ options, handleRemoveAll, handleDeleteOption }) => {
    return (
      <div>
        <div className='widget-header'>
          <h3>Your options</h3>
          <button 
          className='button--link norm' 
          disabled={options.length === 0} 
          onClick={handleRemoveAll}
          >
          Remove all
          </button>
        </div>
        <ol>{options.map((option, index) => (
        <Option 
        key={option}
        index={++index} 
        optionText={option}
        handleDeleteOption={handleDeleteOption} 
        />
        ))}</ol>
      </div>
    );
};

export default Options;