import Frame from "./Frame";
import { useState } from "react";

export function ScoreCardRow() {
  const [activeFrame, setActiveFrame] = useState(0)
  const [frameScore, setFrameScore] = useState<Array<number | null>>([])
  const advanceFrame = (frameTotal: number) => {
    const scores = [...frameScore]
    scores[activeFrame] = frameTotal
    setFrameScore(scores)
    setActiveFrame(activeFrame + 1)
  }
  return (
      <>
        <Frame
            dataCy='frame1'
            isActive={activeFrame === 0}
            onFinish={advanceFrame}
            previousFrameScore={0}
        />
        <Frame
            dataCy='frame2'
            isActive={activeFrame === 1}
            onFinish={advanceFrame}
            previousFrameScore={frameScore[0]}
        />
      </>
  )
}