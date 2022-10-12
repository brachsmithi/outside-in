import { RefObject } from "react";
import { FrameStateEnum } from "./Frame";
import { isCharacterValid } from "./validators";

export type FrameInputProps = {
  inputRef: RefObject<HTMLInputElement>
  setFrameState: (state: FrameStateEnum) => void
  nextFrameState: FrameStateEnum
  dataCy: string
}

export function FrameInput({inputRef, setFrameState, nextFrameState, dataCy}: FrameInputProps) {
  const changeHandler = () => {
    if (inputRef.current?.value) {
      if (isCharacterValid(inputRef.current?.value)) {
        setFrameState(nextFrameState)
      } else {
        inputRef.current.value = ''
      }
    }
  }
  return <input type='text' ref={inputRef} onChange={changeHandler} data-cy={dataCy}/>
}