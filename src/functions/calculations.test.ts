import { createFrameDescriptions } from "./initializers";
import { resolveScores } from "./calculations";
import { FrameStateEnum } from "../models/stateEnums";
import { FrameDescription } from "../models/FrameDescription";

describe('calculations', () => {
  describe('resolveScores', () => {
    function frameDescriptions() {
      return createFrameDescriptions()
    }

    function setFrame(description: FrameDescription, state: FrameStateEnum, firstThrow: string | null = null, secondThrow: string | null = null, thirdThrow: string | null = null) {
      description.frameState = state
      description.firstThrow = firstThrow
      description.secondThrow = secondThrow
      description.thirdThrow = thirdThrow
    }

    function assertScores(descriptions: FrameDescription[], expectedScores: number[]) {
      for (let i = 0; i < expectedScores.length; i++) {
        expect(descriptions[i].score).toEqual(expectedScores[i])
      }
      for (let i = expectedScores.length; i < descriptions.length; i++) {
        expect(descriptions[i].score).toBeNull()
      }
    }

    it('should total a frame under 9', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Done', '5', '2')
      setFrame(descriptions[1], 'First Throw')

      resolveScores(descriptions)

      assertScores(descriptions, [7])
    })

    it('should add the cumulative totals', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Done', '5', '2')
      setFrame(descriptions[1], 'Done', '4', '0')
      setFrame(descriptions[2], 'Done', '1', '5')
      setFrame(descriptions[3], 'Done', '3', '4')
      setFrame(descriptions[4], 'First Throw')

      resolveScores(descriptions)

      assertScores(descriptions, [7, 11, 17, 24])
    })

    it('should leave a spare unresolved when next frame has no first throw', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Pending', '7', '/')
      setFrame(descriptions[1], 'First Throw')

      resolveScores(descriptions)

      assertScores(descriptions, [])
    })

    it('should resolve a spare when the next frame has a throw', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Pending', '6', '/')
      setFrame(descriptions[1], 'Second Throw', '3')

      resolveScores(descriptions)

      assertScores(descriptions, [13])
    })

    it('should leave a strike unresolved when next frame has no second throw', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Pending', 'x')
      setFrame(descriptions[1], 'Second Throw', '6')

      resolveScores(descriptions)

      assertScores(descriptions, [])
    })

    it('should resolve a strike when next frame has two throws', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Pending', 'x')
      setFrame(descriptions[1], 'Done', '4', '3')
      setFrame(descriptions[2], 'First Throw')

      resolveScores(descriptions)

      assertScores(descriptions, [17, 24])
    })

    it('should resolve a strike when next frame has another strike', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Pending', 'x')
      setFrame(descriptions[1], 'Pending', 'X')
      setFrame(descriptions[2], 'Done', '5', '4')
      setFrame(descriptions[3], 'First Throw')

      resolveScores(descriptions)

      assertScores(descriptions, [25, 44, 53])
    })

    it('should resolve a strike when next frame is a spare', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Pending', 'x')
      setFrame(descriptions[1], 'Pending', '5', '/')
      setFrame(descriptions[2], 'Done', '8', '1')
      setFrame(descriptions[3], 'First Throw')

      resolveScores(descriptions)

      assertScores(descriptions, [20, 38, 47])
    })

    it('should resolve a strike followed by two strikes', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Pending', 'x')
      setFrame(descriptions[1], 'Pending', 'X')
      setFrame(descriptions[2], 'Pending', 'x')
      setFrame(descriptions[3], 'Done', '4', '2')
      setFrame(descriptions[4], 'First Throw')

      resolveScores(descriptions)

      assertScores(descriptions, [30, 54, 70, 76])
    })

    it('should resolve the extra frame when there is one throw following a spare', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Done', '1', '0')
      setFrame(descriptions[1], 'Done', '3', '2')
      setFrame(descriptions[2], 'Done', '5', '1')
      setFrame(descriptions[3], 'Done', '0', '3')
      setFrame(descriptions[4], 'Done', '2', '4')
      setFrame(descriptions[5], 'Done', '3', '2')
      setFrame(descriptions[6], 'Done', '2', '1')
      setFrame(descriptions[7], 'Done', '4', '2')
      setFrame(descriptions[8], 'Pending', '5', '/')
      setFrame(descriptions[9], 'Second Throw', '3')

      resolveScores(descriptions)

      assertScores(descriptions, [1, 6, 12, 15, 21, 26, 29, 35, 48, 51])
    })

    it('should leave the extra frame unresolved until there are two throws following a strike', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Done', '4', '3')
      setFrame(descriptions[1], 'Done', '2', '2')
      setFrame(descriptions[2], 'Done', '1', '5')
      setFrame(descriptions[3], 'Done', '5', '0')
      setFrame(descriptions[4], 'Done', '4', '0')
      setFrame(descriptions[5], 'Done', '1', '5')
      setFrame(descriptions[6], 'Done', '4', '2')
      setFrame(descriptions[7], 'Done', '1', '6')
      setFrame(descriptions[8], 'Pending', 'x')
      setFrame(descriptions[9], 'Second Throw', '7')

      resolveScores(descriptions)

      assertScores(descriptions, [7, 11, 17, 22, 26, 32, 38, 45])
    })

    it('should resolve the extra frame when there are two throws following a strike', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Done', '5', '4')
      setFrame(descriptions[1], 'Done', '3', '3')
      setFrame(descriptions[2], 'Done', '2', '6')
      setFrame(descriptions[3], 'Done', '6', '1')
      setFrame(descriptions[4], 'Done', '5', '0')
      setFrame(descriptions[5], 'Done', '2', '6')
      setFrame(descriptions[6], 'Done', '5', '3')
      setFrame(descriptions[7], 'Done', '2', '7')
      setFrame(descriptions[8], 'Pending', 'x')
      setFrame(descriptions[9], 'Done', '3', '5')

      resolveScores(descriptions)

      assertScores(descriptions, [9, 15, 23, 30, 35, 43, 51, 60, 78, 86])
    })

    it('should leave the extra frame unresolved when the second throw is a spare after a strike in the previous frame', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Done', '3', '5')
      setFrame(descriptions[1], 'Done', '4', '2')
      setFrame(descriptions[2], 'Done', '5', '1')
      setFrame(descriptions[3], 'Done', '4', '0')
      setFrame(descriptions[4], 'Done', '5', '3')
      setFrame(descriptions[5], 'Done', '2', '5')
      setFrame(descriptions[6], 'Done', '2', '3')
      setFrame(descriptions[7], 'Done', '4', '4')
      setFrame(descriptions[8], 'Pending', 'x')
      setFrame(descriptions[9], 'Pending', '5', '/')

      resolveScores(descriptions)

      assertScores(descriptions, [8, 14, 20, 24, 32, 39, 44, 52, 72])
    })

    it('should resolve a spare in the extra frame after a strike in the previous frame', () => {
      const descriptions = frameDescriptions()
      setFrame(descriptions[0], 'Done', '5', '2')
      setFrame(descriptions[1], 'Done', '3', '6')
      setFrame(descriptions[2], 'Done', '7', '1')
      setFrame(descriptions[3], 'Done', '2', '4')
      setFrame(descriptions[4], 'Done', '9', '0')
      setFrame(descriptions[5], 'Done', '3', '5')
      setFrame(descriptions[6], 'Done', '0', '8')
      setFrame(descriptions[7], 'Done', '1', '6')
      setFrame(descriptions[8], 'Pending', 'x')
      setFrame(descriptions[9], 'Done', '6', '/', '5')

      resolveScores(descriptions)

      assertScores(descriptions, [7, 16, 24, 30, 39, 47, 55, 62, 82, 97])
    })
  })
})