import React, { useEffect, useRef } from 'react';
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
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)

  function setFrameState(frameState: FrameStateEnum) {
    setStateForFrame(frameState, description.index)
  }
  useEffect(() => {
    if (description.frameState === 'Done') {
      if (throwOneInput.current && throwTwoInput.current) {
        if (isSecondThrowValid(throwOneInput.current.value, throwTwoInput.current.value)) {
          throwTwoInput.current.blur()
          onFinish(throwOneInput.current.value, throwTwoInput.current.value)
        } else {
          throwTwoInput.current.value = ''
          setFrameState('Second Throw')
        }
      }
    } else if (description.frameState === 'Pending') {
      if (throwOneInput.current && throwTwoInput.current) {
        throwTwoInput.current?.blur()
        onFinish(throwOneInput.current.value, throwTwoInput.current.value)
      }
    } else if (description.frameState === 'First Throw') {
      throwOneInput.current?.focus()
    } else {
      throwTwoInput.current?.focus()
    }
  }, [description.frameState])
  useEffect(() => {
    if (isActive && description.frameState === 'Not Started') {
      setFrameState('First Throw')
    }
  }, [description.frameState, isActive])

  return (
    <div className='frame'>
      <div className='frame-top'>
        <FrameInput
            dataCy={ `${description.tag}_throw1` }
            active={description.frameState === 'First Throw'}
            inputRef={throwOneInput}
            setFrameState={setFrameState}
            nextFrameState={'Second Throw'}
        />
        <FrameInput
            dataCy={ `${description.tag}_throw2` }
            active={description.frameState === 'Second Throw'}
            inputRef={throwTwoInput}
            setFrameState={setFrameState}
            nextFrameState={'Done'}
        />
      </div>
      <div className='frame-bottom'>
        <span data-cy={ `${description.tag}_total` }>{description.score}</span>
      </div>
    </div>
  );
}
