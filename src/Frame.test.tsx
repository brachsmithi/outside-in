import { render, screen } from "@testing-library/react";
import Frame from "./Frame";
import userEvent from "@testing-library/user-event";

describe('Frame', () => {
  describe('character validation', () => {
    it('should not allow a letter character in the first throw', () => {
      render(<Frame/>)
      const inputElements = screen.getAllByRole('textbox')
      userEvent.type(inputElements[0], 'x')
      expect(inputElements[0]).toHaveDisplayValue('')
      expect(inputElements[0]).toHaveFocus();
    })
    it('should not allow a letter character in the second throw', () => {
      render(<Frame/>)
      const inputElements = screen.getAllByRole('textbox')
      userEvent.type(inputElements[0], '3')
      userEvent.type(inputElements[1], 'y')
      expect(inputElements[1]).toHaveDisplayValue('')
      expect(inputElements[1]).toHaveFocus();
    })
  })
})