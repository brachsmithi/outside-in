import { render, screen } from "@testing-library/react";
import { FrameInput } from "./FrameInput";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { FrameStateEnum } from "./Frame";

describe('Frame Input', () => {
  function TestWrapper() {
    const [_, setState] = useState<FrameStateEnum>('First Throw')
    const ref = useRef<HTMLInputElement>(null)
    return <FrameInput inputRef={ref} setFrameState={setState} nextFrameState={'Second Throw'} dataCy={'field'}/>
  }
  describe('character validation', () => {
    it('should not allow a letter character', () => {
      render(<TestWrapper/>)
      const inputElement = screen.getByRole('textbox')
      userEvent.type(inputElement, 'x')
      expect(inputElement).toHaveDisplayValue('')
      expect(inputElement).toHaveFocus();
    })
    it('should not allow a different letter character', () => {
      render(<TestWrapper/>)
      const inputElement = screen.getByRole('textbox')
      userEvent.type(inputElement, 'y')
      expect(inputElement).toHaveDisplayValue('')
      expect(inputElement).toHaveFocus();
    })
  })
})