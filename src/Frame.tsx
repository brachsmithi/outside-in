import React, { useLayoutEffect, useRef, useState } from 'react';

function Frame() {
  const [total, setTotal] = useState<number|''>('')
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)

  const firstThrowOnChange = () => {
    if (throwOneInput.current?.value === 'x') {
      throwOneInput.current.value = ''
      throwOneInput.current.focus()
    } else {
      throwTwoInput.current !== null && throwTwoInput.current.focus()
    }
  }
  const secondThrowOnChange = () => {
    if (throwTwoInput.current?.value === 'y') {
      throwTwoInput.current.value = ''
      throwTwoInput.current.focus()
    } else if (throwOneInput.current !== null && throwTwoInput.current !== null) {
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
      <input type='text' data-cy='throw1' ref={throwOneInput} onChange={firstThrowOnChange}/>
      <input type='text' data-cy='throw2' ref={throwTwoInput} onChange={secondThrowOnChange}/>
      <span data-cy='total'>{total}</span>
    </>
  );
}

export default Frame;
