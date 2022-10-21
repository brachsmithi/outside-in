import React, { useEffect, useRef } from 'react';
import './Frame.css'
import { FrameInput } from "./FrameInput";
import { isSecondThrowValid } from "../functions/validators";
import { FrameStateEnum } from "../models/stateEnums";
import { FrameDescription } from "../models/FrameDescription";

export type FrameProps = {
  description: FrameDescription
  isActive: boolean
  updateThrows: (firstThrow: string, secondThrow: string | null) => void
  setFrameState: (frameState: FrameStateEnum, index: number) => void
}

export function Frame({description, isActive, updateThrows, setFrameState}: FrameProps) {
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (description.frameState === 'Done') {
      if (throwOneInput.current && throwTwoInput.current) {
        if (isSecondThrowValid(throwOneInput.current.value, throwTwoInput.current.value)) {
          throwTwoInput.current.blur()
          updateThrows(throwOneInput.current.value, throwTwoInput.current.value)
        } else {
          throwTwoInput.current.value = ''
          setFrameState('Second Throw', description.index)
        }
      }
    } else if (description.frameState === 'Pending') {
      if (throwOneInput.current && throwTwoInput.current) {
        throwTwoInput.current?.blur()
        updateThrows(throwOneInput.current.value, throwTwoInput.current.value)
      }
    } else if (description.frameState === 'First Throw') {
      throwOneInput.current?.focus()
    } else if (description.frameState === 'Second Throw') {
      if (throwOneInput.current) {
        updateThrows(throwOneInput.current.value, null)
      }
      throwTwoInput.current?.focus()
    }
  }, [description.frameState])
  useEffect(() => {
    if (isActive && description.frameState === 'Not Started') {
      setFrameState('First Throw', description.index)
    }
  }, [description.frameState, isActive])

  return (
    <div className='frame'>
      <div className='frame-top'>
        <FrameInput
            dataCy={ `${description.tag}_throw1` }
            active={description.frameState === 'First Throw'}
            inputRef={throwOneInput}
            setFrameState={(frameState) => setFrameState(frameState, description.index)}
            nextFrameState={'Second Throw'}
        />
        <FrameInput
            dataCy={ `${description.tag}_throw2` }
            active={description.frameState === 'Second Throw'}
            inputRef={throwTwoInput}
            setFrameState={(frameState) => setFrameState(frameState, description.index)}
            nextFrameState={'Done'}
        />
      </div>
      <div className='frame-bottom'>
        <span data-cy={ `${description.tag}_total` }>{description.score}</span>
      </div>
    </div>
  );
}
