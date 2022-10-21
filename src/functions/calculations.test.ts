import { createFrameDescriptions } from "./initializers";
import { resolveScores } from "./calculation";
import { FrameStateEnum } from "../models/stateEnums";
import { FrameDescription } from "../models/FrameDescription";

describe('calculations', () => {
  describe('resolveScores', () => {
    function frameDescriptions() {
      return createFrameDescriptions()
    }

    function setFrame(description: FrameDescription, state: FrameStateEnum, firstThrow: string | null = null, secondThrow: string | null = null) {
      description.frameState = state
      description.firstThrow = firstThrow
      description.secondThrow = secondThrow
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
  })
})