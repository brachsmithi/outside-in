import { Frame } from "./Frame";
import { useState } from "react";
import { createFrameDescriptions } from "../functions/initializers";
import { FrameDescription } from "../models/FrameDescription";

export function ScoreCardRow() {
  const [frameDescriptions] = useState<FrameDescription[]>(createFrameDescriptions())
  const [activeFrame, setActiveFrame] = useState<FrameDescription>(frameDescriptions[0])
  const advanceFrame = (frameTotal: number) => {
    activeFrame.score = frameTotal
    if (activeFrame.index + 1 < frameDescriptions.length) {
      setActiveFrame(frameDescriptions[activeFrame.index + 1])
    }
  }
  return (
      <>
        <Frame
            dataCy={frameDescriptions[0].tag}
            isActive={activeFrame.index === frameDescriptions[0].index}
            onFinish={advanceFrame}
            previousFrameScore={0}
        />
        <Frame
            dataCy={frameDescriptions[1].tag}
            isActive={activeFrame.index === frameDescriptions[1].index}
            onFinish={advanceFrame}
            previousFrameScore={frameDescriptions[0].score}
        />
      </>
  )
}