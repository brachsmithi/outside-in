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
        {
          frameDescriptions.map(description => {
            return <Frame
                key={description.tag}
                dataCy={description.tag}
                isActive={activeFrame.index === description.index}
                onFinish={advanceFrame}
                previousFrameScore={frameDescriptions[description.index - 1]?.score ?? 0}
            />
          })
        }
      </>
  )
}