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

  function setFrameThrows(firstThrow: string, secondThrow: string) {
    const descriptions = [...frameDescriptions]
    descriptions[activeFrame.index].firstThrow = firstThrow
    descriptions[activeFrame.index].secondThrow = secondThrow
    setFrameDescriptions(descriptions)
  }

  const updateThrows = (firstThrow: string, secondThrow: string) => {
    setFrameThrows(firstThrow, secondThrow)
    const previousFrame = (activeFrame.index - 1 >= 0) ? frameDescriptions[activeFrame.index - 1] : null
    if (secondThrow !== '/') {
      activeFrame.score = (previousFrame?.score ?? 0) + Number(firstThrow) + Number(secondThrow)
    }
    if ((activeFrame.frameState === 'Done' || activeFrame.frameState === 'Pending') && activeFrame.index + 1 < frameDescriptions.length) {
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
                updateThrows={updateThrows}
                setFrameState={setFrameState}
            />
          })
        }
      </div>
  )
}