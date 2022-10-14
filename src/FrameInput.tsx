import { RefObject } from "react";
import { FrameStateEnum } from "./Frame";
import { isCharacterValid } from "./validators";
import './FrameInput.css'

export type FrameInputProps = {
  inputRef: RefObject<HTMLInputElement>
  active: boolean
  setFrameState: (state: FrameStateEnum) => void
  nextFrameState: FrameStateEnum
  dataCy: string
}

export function FrameInput({inputRef, active, setFrameState, nextFrameState, dataCy}: FrameInputProps) {
  const changeHandler = () => {
    if (inputRef.current?.value) {
      if (isCharacterValid(inputRef.current?.value)) {
        setFrameState(nextFrameState)
      } else {
        inputRef.current.value = ''
      }
    }
  }
  return <input type='text' className='frame-input' ref={inputRef} disabled={!active} onChange={changeHandler} data-cy={dataCy}/>
}