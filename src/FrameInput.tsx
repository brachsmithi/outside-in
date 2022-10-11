import { RefObject } from "react";
import { FrameStateEnum } from "./Frame";

export type FrameInputProps = {
  inputRef: RefObject<HTMLInputElement>
  setFrameState: (state: FrameStateEnum) => void
  nextFrameState: FrameStateEnum
  dataCy: string
}

export function FrameInput({inputRef, setFrameState, nextFrameState, dataCy}: FrameInputProps) {
  const changeHandler = () => {
    if (inputRef.current?.value === 'x' || inputRef.current?.value === 'y') {
      inputRef.current.value = ''
    } else {
      setFrameState(nextFrameState)
    }
  }
  return <input type='text' ref={inputRef} onChange={changeHandler} data-cy={dataCy}/>
}