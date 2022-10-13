import React, { useEffect, useRef, useState } from 'react';
import { FrameInput } from "./FrameInput";
import { isTotalValid } from "./validators";

export type FrameStateEnum = 'First Throw' | 'Second Throw' | 'Done'
function Frame() {
  const [total, setTotal] = useState<number | ''>('')
  const [frameState, setFrameState] = useState<FrameStateEnum>('First Throw')
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (frameState === 'Done') {
      if (throwOneInput.current && throwTwoInput.current) {
        const value1 = Number(throwOneInput.current.value)
        const value2 = Number(throwTwoInput.current.value)
        const total = value1 + value2
        if (isTotalValid(total)) {
          setTotal(total)
          throwTwoInput.current.blur()
        } else {
          throwTwoInput.current.value = ''
          setFrameState('Second Throw')
        }
      }
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
