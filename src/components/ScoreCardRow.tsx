import { Frame } from "./Frame";
import { useState } from "react";
import { createFrameDescriptions } from "../functions/initializers";
import { FrameDescription } from "../models/FrameDescription";
import './ScoreCardRow.css'
import { FrameStateEnum } from "../models/stateEnums";
import { resolveScores } from "../functions/calculation";

export function ScoreCardRow() {
  const [frameDescriptions, setFrameDescriptions] = useState<FrameDescription[]>(createFrameDescriptions())
  const [activeFrame, setActiveFrame] = useState<FrameDescription>(frameDescriptions[0])

  function setFrameState(frameState: FrameStateEnum, index: number) {
    const descriptions = [...frameDescriptions]
    descriptions[index].frameState = frameState
    setFrameDescriptions(descriptions)
  }

  function setFrameThrows(firstThrow: string, secondThrow: string | null) {
    const descriptions = [...frameDescriptions]
    descriptions[activeFrame.index].firstThrow = firstThrow
    descriptions[activeFrame.index].secondThrow = secondThrow
    setFrameDescriptions(descriptions)
  }

  const updateThrows = (firstThrow: string, secondThrow: string | null) => {
    setFrameThrows(firstThrow, secondThrow)
    const descriptions = [...frameDescriptions]
    resolveScores(descriptions)
    setFrameDescriptions(descriptions)
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