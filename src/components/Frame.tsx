import React, { useEffect, useRef } from 'react';
import './Frame.css'
import { FrameInput } from "./FrameInput";
import { isFirstThrowValid, isSecondThrowValid, isThirdThrowValid } from "../functions/validators";
import { FrameStateEnum } from "../models/stateEnums";
import { FrameDescription } from "../models/FrameDescription";
import { isExtraFrame } from "../functions/analyzers";

export type FrameProps = {
  description: FrameDescription
  isActive: boolean
  updateThrows: (firstThrow: string, secondThrow: string | null, value: string | null) => void
  setFrameState: (frameState: FrameStateEnum, index: number) => void
}

export function Frame({description, isActive, updateThrows, setFrameState}: FrameProps) {
  const throwOneInput = useRef<HTMLInputElement>(null)
  const throwTwoInput = useRef<HTMLInputElement>(null)
  const throwThreeInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (description.frameState === 'Done') {
      if (throwOneInput.current && throwTwoInput.current) {
        updateThrows(throwOneInput.current.value, throwTwoInput.current.value, throwThreeInput.current?.value ?? null)
      }
    } else if (description.frameState === 'Pending') {
      if (throwOneInput.current && throwTwoInput.current) {
        updateThrows(throwOneInput.current.value, throwTwoInput.current.value, throwThreeInput.current?.value ?? null)
      }
    } else if (description.frameState === 'First Throw') {
      throwOneInput.current?.focus()
    } else if (description.frameState === 'Second Throw') {
      if (throwOneInput.current) {
        updateThrows(throwOneInput.current.value, null, null)
      }
      throwTwoInput.current?.focus()
    } else if (description.frameState === 'Third Throw') {
      throwThreeInput.current?.focus()
    }
  }, [description.frameState])
  useEffect(() => {
    if (isActive && description.frameState === 'Not Started') {
      setFrameState('First Throw', description.index)
    }
  }, [description.frameState, isActive])

  const frameStateCallback = (frameState: FrameStateEnum) => setFrameState(frameState, description.index)

  return (
    <div className='frame'>
      <div className='frame-top'>
        <FrameInput
            dataCy={ `${description.tag}_throw1` }
            active={description.frameState === 'First Throw'}
            inputRef={throwOneInput}
            isValidForThrow={isFirstThrowValid}
            setFrameState={frameStateCallback}
            nextFrameState={'Second Throw'}
        />
        <FrameInput
            dataCy={ `${description.tag}_throw2` }
            active={description.frameState === 'Second Throw'}
            inputRef={throwTwoInput}
            isValidForThrow={(value: string) => isSecondThrowValid(throwOneInput.current?.value ?? '', value, isExtraFrame(description))}
            setFrameState={frameStateCallback}
            nextFrameState={'Done'}
        />
        {isExtraFrame(description) && (
            <FrameInput
                dataCy={ `${description.tag}_throw3` }
                active={description.frameState === 'Third Throw'}
                inputRef={throwThreeInput}
                isValidForThrow={(value: string) => isThirdThrowValid(throwOneInput.current?.value ?? '', throwTwoInput.current?.value ?? '', value)}
                setFrameState={frameStateCallback}
                nextFrameState={'Done'}
            />
          )
        }
      </div>
      <div className='frame-bottom'>
        <span data-cy={ `${description.tag}_total` }>{description.score}</span>
      </div>
    </div>
  );
}
