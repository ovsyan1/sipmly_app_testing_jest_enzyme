import React, { useState } from 'react';

import './App.css';

const App = () => {
    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);
    let counterError;
  if(error) {
    counterError = <div data-test='error-message'>Counter can't go below zero</div>
  }
    
    return (
    <div data-test='component-app'>
      <h1 data-test='counter-display'>
        The counter is currently&nbsp;
        <span data-test='count'>{count}</span>
      </h1>
      {counterError}
      <button data-test='increment-button'
          onClick={() => {
            setCount(count + 1)
            setError(false)
          }
          }>
            Increment counter</button>
      <button data-test='decrement-button'
          onClick={() => {
            if(count){
              setCount(count - 1)
            }else{
              setError(true)
            }
            
          }}
      >Decrement button</button>
    </div>
    )
}

export default App;
