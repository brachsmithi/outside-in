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
      if (current.frameState === 'Done' && !current.thirdThrow) {
        current.score = add(cumulativeScore, current.firstThrow, current.secondThrow)
      } else if (current.frameState === 'Pending' && next) {
        if (isSpare(current.secondThrow) && next.firstThrow) {
          current.score = add(cumulativeScore, 10, next.firstThrow)
        } else if (isStrike(current.firstThrow)) {
          if (isStrike(next.firstThrow) && isExtraFrame(next) && next.secondThrow) {
            const secondValue = isStrike(next.secondThrow) ? 10 : next.secondThrow
            current.score = add(cumulativeScore, 20, secondValue)
          } else if (next.secondThrow) {
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
          if (isSpare(current.secondThrow)) {
            if (current.thirdThrow) {
              current.score = add(cumulativeScore, 10, current.thirdThrow)
            }
          } else if (isStrike(current.firstThrow)) {
            if (current.secondThrow && current.thirdThrow) {
              const secondValue = isStrike(current.secondThrow) ? 10 : current.secondThrow
              const thirdValue = isStrike(current.thirdThrow) ? 10 : current.thirdThrow
              current.score = add(cumulativeScore, 10, secondValue, thirdValue)
            }
          } else {
            current.score = add(cumulativeScore, current.firstThrow, current.secondThrow)
          }
        }
      }
    }
  }
}