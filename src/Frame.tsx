import React, { useEffect, useRef, useState } from 'react';
import { FrameInput } from "./FrameInput";

export type FrameStateEnum = 'First Throw' | 'Second Throw' | 'Done'
function Frame() {
  const [total, setTotal] = useState<number | ''>('')
  const [frameState, setFrameState] = useState<FrameStateEnum>('First Throw')
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (frameState === 'Done') {
      const value1 = Number(throwOneInput.current?.value)
      const value2 = Number(throwTwoInput.current?.value)
      setTotal(value1 + value2)
      throwTwoInput.current?.blur()
    } else if (frameState === 'First Throw') {
      throwOneInput.current?.focus()
    } else {
      throwTwoInput.current?.focus()
    }
  }, [frameState])
  return (
    <>
      <FrameInput dataCy='throw1' inputRef={throwOneInput} setFrameState={setFrameState} nextFrameState={'Second Throw'}/>
      <FrameInput dataCy='throw2' inputRef={throwTwoInput} setFrameState={setFrameState} nextFrameState={'Done'}/>
      <span data-cy='total'>{total}</span>
    </>
  );
}

export default Frame;
