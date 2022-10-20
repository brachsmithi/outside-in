import { Frame } from "./Frame";
import { useState } from "react";
import { createFrameDescriptions } from "../functions/initializers";
import { FrameDescription } from "../models/FrameDescription";
import './ScoreCardRow.css'
import { FrameStateEnum } from "../models/stateEnums";

export function ScoreCardRow() {
  const [frameDescriptions, setFrameDescriptions] = useState<FrameDescription[]>(createFrameDescriptions())
  const [activeFrame, setActiveFrame] = useState<FrameDescription>(frameDescriptions[0])

  function setFrameState(frameState: FrameStateEnum, index: number) {
    const descriptions = [...frameDescriptions]
    descriptions[index].frameState = frameState
    setFrameDescriptions(descriptions)
  }
  const advanceFrame = (firstThrow: string, secondThrow: string) => {
    const previousFrame = (activeFrame.index - 1 >= 0) ? frameDescriptions[activeFrame.index - 1] : null
    if (secondThrow !== '/') {
      activeFrame.score = (previousFrame?.score ?? 0) + Number(firstThrow) + Number(secondThrow)
    }
    if (activeFrame.index + 1 < frameDescriptions.length) {
      setActiveFrame(frameDescriptions[activeFrame.index + 1])
    }
  }
  return (
      <div className='scoreCardRow'>
        {
          frameDescriptions.map(description => {
            return <Frame
                key={description.tag}
                description={description}
                isActive={activeFrame.index === description.index}
                onFinish={advanceFrame}
                setStateForFrame={setFrameState}
            />
          })
        }
      </div>
  )
}