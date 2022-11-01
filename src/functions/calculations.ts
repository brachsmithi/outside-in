import { FrameDescription } from "../models/FrameDescription";
import { isExtraFrame, isSpare, isStrike } from "./analyzers";

function lensOn(frameDescriptions: FrameDescription[], index: number) {
  return [
      frameDescriptions[index - 1] ?? null,
      frameDescriptions[index],
      frameDescriptions[index + 1] ?? null,
      frameDescriptions[index + 2] ?? null
  ]
}

function add(base: number, ...addends: Array<number | string | null>) {
  return addends.reduce((acc: number, addend) => {
    return acc + Number(addend)
  }, base)
}

export function resolveScores(frameDescriptions: FrameDescription[]) {
  for (let i = 0; i < frameDescriptions.length; i++) {
    const [previous, current, next, afterNext] = lensOn(frameDescriptions, i)
    if (current.score === null) {
      const cumulativeScore = previous?.score ?? 0
      if (current.frameState === 'Done') {
        current.score = add(cumulativeScore, current.firstThrow, current.secondThrow)
      } else if (current.frameState === 'Pending' && next) {
        if (isSpare(current.secondThrow) && next.firstThrow) {
          current.score = add(cumulativeScore, 10, next.firstThrow)
        } else if (isStrike(current.firstThrow)) {
          if (next.secondThrow) {
            if (isSpare(next.secondThrow)) {
              current.score = add(cumulativeScore, 20)
            } else {
              current.score = add(cumulativeScore, 10, next.firstThrow, next.secondThrow)
            }
          } else if (afterNext && afterNext.firstThrow) {
            if (isStrike(afterNext.firstThrow)) {
              current.score = add(cumulativeScore, 30)
            } else {
              current.score = add(cumulativeScore, 20, afterNext.firstThrow)
            }
          }
        }
      } else if (isExtraFrame(current) && previous?.frameState === 'Pending') {
        if (isSpare(previous.secondThrow) && current.firstThrow) {
          current.score = add(cumulativeScore, current.firstThrow)
        } else if (isStrike(previous.firstThrow) && current.secondThrow) {
          current.score = add(cumulativeScore, current.firstThrow, current.secondThrow)
        }
      }
    }
  }
}