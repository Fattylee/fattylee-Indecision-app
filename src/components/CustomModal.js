import React from 'react';

export default ({ no, yes }) => {
  return (
  <div className={'overlay'}>
    <div className={'custom-modal'}>
      <h3 style={{height: '100px', textAlign: 'center'}}>Are you sure?</h3>
      <div>
      <button onClick={() => no()}>No</button>
      <button onClick={() => yes()}>Yes</button>
      </div>
    </div>
   </div>
  );
};