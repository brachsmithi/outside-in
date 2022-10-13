import { render, screen } from "@testing-library/react";
import Frame from "./Frame";
import userEvent from "@testing-library/user-event";

describe('Frame test', () => {
  describe('form validation', () => {
    it('should not allow more than 10 pins to be recorded', () => {
      render(<Frame/>)
      const inputs = screen.getAllByRole('textbox')
      userEvent.type(inputs[0], '7')
      userEvent.type(inputs[1], '9')
      expect(inputs[1]).toHaveDisplayValue('')
      expect(inputs[1]).toHaveFocus()
    })
  })
})