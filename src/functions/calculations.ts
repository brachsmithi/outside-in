import { FrameDescription } from "../models/FrameDescription";
import { isExtraFrame } from "./analyzers";

function lensOn(frameDescriptions: FrameDescription[], index: number) {
  return [
      frameDescriptions[index - 1] ?? null,
      frameDescriptions[index],
      frameDescriptions[index + 1] ?? null
  ]
}

function add(base: number, ...addends: Array<number | string | null>) {
  return addends.reduce((acc: number, addend) => {
    return acc + Number(addend)
  }, base)
}

export function resolveScores(frameDescriptions: FrameDescription[]) {
  for (let i = 0; i < frameDescriptions.length; i++) {
    const [previous, current, next] = lensOn(frameDescriptions, i)
    const cumulativeScore = previous?.score ?? 0
    if ( current.score === null && current.frameState === 'Done') {
      current.score = add(cumulativeScore, current.firstThrow, current.secondThrow)
    } else if (current.frameState === 'Pending') {
      if (next?.firstThrow) {
        current.score = add(cumulativeScore, 10, next.firstThrow)
      }
    } else if (isExtraFrame(current) && previous?.frameState === 'Pending') {
      if (current.firstThrow) {
        current.score = add(cumulativeScore, current.firstThrow)
      }
    }
  }
}