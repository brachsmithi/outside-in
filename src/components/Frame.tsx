import React, { useEffect, useRef, useState } from 'react';
import './Frame.css'
import { FrameInput } from "./FrameInput";
import { isTotalValid } from "../functions/validators";
import { FrameStateEnum } from "../models/stateEnums";

export type FrameProps = {
  dataCy: string
  isActive: boolean
  onFinish: (total: number) => void
  previousFrameScore: number | null
}

export function Frame({dataCy, isActive, onFinish, previousFrameScore}: FrameProps) {
  const [total, setTotal] = useState<number | ''>('')
  const [frameState, setFrameState] = useState<FrameStateEnum>('Not Started')
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (frameState === 'Done') {
      if (throwOneInput.current && throwTwoInput.current) {
        const value1 = Number(throwOneInput.current.value)
        const value2 = Number(throwTwoInput.current.value)
        const frameTotal = value1 + value2
        if (isTotalValid(frameTotal)) {
          const newTotal = (previousFrameScore ?? 0) + frameTotal
          setTotal(newTotal)
          throwTwoInput.current.blur()
          onFinish(newTotal)
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
  }, [frameState, previousFrameScore])
  useEffect(() => {
    if (isActive && frameState === 'Not Started') {
      setFrameState('First Throw')
    }
  }, [frameState, isActive])
  return (
    <div className='frame'>
      <div className='frame-top'>
        <FrameInput
            dataCy={ `${dataCy}_throw1` }
            active={frameState === 'First Throw'}
            inputRef={throwOneInput}
            setFrameState={setFrameState}
            nextFrameState={'Second Throw'}
        />
        <FrameInput
            dataCy={ `${dataCy}_throw2` }
            active={frameState === 'Second Throw'}
            inputRef={throwTwoInput}
            setFrameState={setFrameState}
            nextFrameState={'Done'}
        />
      </div>
      <div className='frame-bottom'>
        <span data-cy={ `${dataCy}_total` }>{total}</span>
      </div>
    </div>
  );
}
