import React, { useLayoutEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [total, setTotal] = useState<number|null>(null)
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)
  const closeSecondThrow = () => {
    if (throwOneInput.current !== null && throwTwoInput.current !== null) {
      throwTwoInput.current.blur()
      const value1 = Number(throwOneInput.current.value)
      const value2 = Number(throwTwoInput.current.value)
      setTotal(value1 + value2)
    }
  }
  useLayoutEffect(() => {
    throwOneInput.current !== null && throwOneInput.current.focus()
  })
  return (
    <>
      <input type='text' data-cy='throw1' ref={throwOneInput} onChange={() => throwTwoInput.current !== null && throwTwoInput.current.focus()}/>
      <input type='text' data-cy='throw2' ref={throwTwoInput} onChange={closeSecondThrow}/>
      <span data-cy='total'>{total}</span>
    </>
  );
}

export default App;
