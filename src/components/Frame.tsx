import React, { useEffect, useRef, useState } from 'react';
import './Frame.css'
import { FrameInput } from "./FrameInput";
import { isSecondThrowValid } from "../functions/validators";
import { FrameStateEnum } from "../models/stateEnums";
import { FrameDescription } from "../models/FrameDescription";

export type FrameProps = {
  description: FrameDescription
  dataCy: string
  isActive: boolean
  onFinish: (firstThrow: string, secondThrow: string) => void
}

export function Frame({description, dataCy, isActive, onFinish}: FrameProps) {
  const [frameState, setFrameState] = useState<FrameStateEnum>('Not Started')
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (frameState === 'Done') {
      if (throwOneInput.current && throwTwoInput.current) {
        const value1 = Number(throwOneInput.current.value)
        const value2 = Number(throwTwoInput.current.value)
        if (isSecondThrowValid(value1, value2)) {
          throwTwoInput.current.blur()
          onFinish(throwOneInput.current.value, throwTwoInput.current.value)
        } else {
          throwTwoInput.current.value = ''
          setFrameState('Second Throw')
        }
      }
    } else if (frameState === 'Pending') {
      if (throwOneInput.current && throwTwoInput.current) {
        throwTwoInput.current?.blur()
        onFinish(throwOneInput.current.value, throwTwoInput.current.value)
      }
    } else if (frameState === 'First Throw') {
      throwOneInput.current?.focus()
    } else {
      throwTwoInput.current?.focus()
    }
  }, [frameState])
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
        <span data-cy={ `${dataCy}_total` }>{description.score}</span>
      </div>
    </div>
  );
}
