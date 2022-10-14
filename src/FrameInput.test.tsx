import { render, screen } from "@testing-library/react";
import { FrameInput } from "./FrameInput";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { FrameStateEnum } from "./stateEnums";

describe('Frame Input', () => {
  function TestWrapper() {
    const [_, setState] = useState<FrameStateEnum>('First Throw')
    const ref = useRef<HTMLInputElement>(null)
    return <FrameInput inputRef={ref} active={true} setFrameState={setState} nextFrameState={'Second Throw'} dataCy={'field'}/>
  }
  describe('character validation', () => {
    it('should reset invalid data', () => {
      render(<TestWrapper/>)
      const inputElement = screen.getByRole('textbox')
      userEvent.type(inputElement, 'N')
      expect(inputElement).toHaveDisplayValue('')
      expect(inputElement).toHaveFocus();
    })
  })
})