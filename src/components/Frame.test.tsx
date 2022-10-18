import { render, screen } from "@testing-library/react";
import { Frame } from "./Frame";
import userEvent from "@testing-library/user-event";
import { FrameDescription } from "../models/FrameDescription";

describe('Frame test', () => {
  describe('form validation', () => {
    it('should not allow more than 10 pins to be recorded', () => {
      const description: FrameDescription = {
        score: null,
        index: 0,
        tag: 'frame',
      }
      render(<Frame description={description} isActive={true} onFinish={jest.fn()}/>)
      const inputs = screen.getAllByRole('textbox')
      userEvent.type(inputs[0], '7')
      userEvent.type(inputs[1], '9')
      expect(inputs[1]).toHaveDisplayValue('')
      expect(inputs[1]).toHaveFocus()
    })
  })
})