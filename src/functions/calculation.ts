import { FrameDescription } from "../models/FrameDescription";

export function resolveScores(frameDescriptions: FrameDescription[]) {
  function cumulativeScore(index: number) {
    if (index === 0) {
      return 0
    }
    return frameDescriptions[index - 1].score
  }
  function nextFrameFirstThrow(index: number) {
    return frameDescriptions[index + 1].firstThrow
  }
  frameDescriptions.forEach((description) => {
    if (description.frameState === 'Done' && description.score === null) {
      description.score = (cumulativeScore(description.index) ?? 0) + Number(description.firstThrow) + Number(description.secondThrow)
    } else if (description.frameState === 'Pending') {
      const firstThrowOfNextFrame = nextFrameFirstThrow(description.index)
      if (firstThrowOfNextFrame) {
        description.score = (cumulativeScore(description.index) ?? 0) + 10 + Number(firstThrowOfNextFrame)
      }
    }
  })
}