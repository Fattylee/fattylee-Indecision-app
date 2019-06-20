import React from 'react';


const OptionModal = ({ okay, selectedOption }) => {
  return (
  <div className={'overlay'}>
    <div className={'custom-modal'}>
      <span>Selected option</span>
      <h3>{selectedOption}</h3>
      <div>
      <button style={{visibility: 'hidden'}} onClick={() => okay()}>No</button>
      <button onClick={() => okay()}>Okay</button>
      </div>
    </div>
   </div>
  );
};
export default OptionModal;

