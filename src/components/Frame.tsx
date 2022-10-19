import React, { useEffect, useRef, useState } from 'react';
import './Frame.css'
import { FrameInput } from "./FrameInput";
import { isSecondThrowValid } from "../functions/validators";
import { FrameStateEnum } from "../models/stateEnums";
import { FrameDescription } from "../models/FrameDescription";

export type FrameProps = {
  description: FrameDescription
  isActive: boolean
  onFinish: (firstThrow: string, secondThrow: string) => void
  setStateForFrame: (frameState: FrameStateEnum, index: number) => void
}

export function Frame({description, isActive, onFinish, setStateForFrame}: FrameProps) {
  const [internalFrameState, setInternalFrameState] = useState<FrameStateEnum>('Not Started')
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)

  function setFrameState(frameState: FrameStateEnum) {
    setInternalFrameState(frameState)
    setStateForFrame(frameState, description.index)
  }
  useEffect(() => {
    if (internalFrameState === 'Done') {
      if (throwOneInput.current && throwTwoInput.current) {
        if (isSecondThrowValid(throwOneInput.current.value, throwTwoInput.current.value)) {
          throwTwoInput.current.blur()
          onFinish(throwOneInput.current.value, throwTwoInput.current.value)
        } else {
          throwTwoInput.current.value = ''
          setFrameState('Second Throw')
        }
      }
    } else if (internalFrameState === 'Pending') {
      if (throwOneInput.current && throwTwoInput.current) {
        throwTwoInput.current?.blur()
        onFinish(throwOneInput.current.value, throwTwoInput.current.value)
      }
    } else if (internalFrameState === 'First Throw') {
      throwOneInput.current?.focus()
    } else {
      throwTwoInput.current?.focus()
    }
  }, [internalFrameState])
  useEffect(() => {
    if (isActive && internalFrameState === 'Not Started') {
      setInternalFrameState('First Throw')
    }
  }, [internalFrameState, isActive])

  return (
    <div className='frame'>
      <div className='frame-top'>
        <FrameInput
            dataCy={ `${description.tag}_throw1` }
            active={internalFrameState === 'First Throw'}
            inputRef={throwOneInput}
            setFrameState={setInternalFrameState}
            nextFrameState={'Second Throw'}
        />
        <FrameInput
            dataCy={ `${description.tag}_throw2` }
            active={internalFrameState === 'Second Throw'}
            inputRef={throwTwoInput}
            setFrameState={setInternalFrameState}
            nextFrameState={'Done'}
        />
      </div>
      <div className='frame-bottom'>
        <span data-cy={ `${description.tag}_total` }>{description.score}</span>
      </div>
    </div>
  );
}
