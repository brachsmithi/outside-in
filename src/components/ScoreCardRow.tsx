import { Frame } from "./Frame";
import { useState } from "react";
import { createFrameDescriptions } from "../functions/initializers";
import { FrameDescription } from "../models/FrameDescription";
import './ScoreCardRow.css'
import { FrameStateEnum } from "../models/stateEnums";
import { resolveScores } from "../functions/calculations";
import { isExtraFrame, isLastFrame, isSpare, isStrike } from "../functions/analyzers";

export function ScoreCardRow() {
  const [frameDescriptions, setFrameDescriptions] = useState<FrameDescription[]>(createFrameDescriptions())
  const [activeFrame, setActiveFrame] = useState<FrameDescription | null>(frameDescriptions[0])

  function setFrameState(frameState: FrameStateEnum, index: number) {
    const descriptions = [...frameDescriptions]
    descriptions[index].frameState = frameState
    setFrameDescriptions(descriptions)
  }

  function setFrameThrows(firstThrow: string, secondThrow: string | null, thirdThrow: string | null) {
    if (activeFrame) {
      const descriptions = [ ...frameDescriptions ]
      descriptions[activeFrame.index].firstThrow = firstThrow
      descriptions[activeFrame.index].secondThrow = secondThrow
      descriptions[activeFrame.index].thirdThrow = thirdThrow
      setFrameDescriptions(descriptions)
    }
  }

  const updateThrows = (firstThrow: string, secondThrow: string | null, thirdThrow: string | null) => {
    setFrameThrows(firstThrow, secondThrow, thirdThrow)
    const descriptions = [...frameDescriptions]
    resolveScores(descriptions)
    setFrameDescriptions(descriptions)
    if (activeFrame) {
      if (activeFrame.frameState === 'Done' && (isLastFrame(activeFrame) || isExtraFrame(activeFrame))) {
        setActiveFrame(null)
      } else if ((activeFrame.frameState === 'Done' || activeFrame.frameState === 'Pending') && !isExtraFrame(activeFrame)) {
        setActiveFrame(frameDescriptions[activeFrame.index + 1])
      } else if (isExtraFrame(activeFrame)) {
        const previousFrame = descriptions[activeFrame.index - 1]
        if (isSpare(previousFrame.secondThrow) && activeFrame.frameState === 'Second Throw') {
          setFrameState('Done', activeFrame.index)
        } else if (isStrike(previousFrame.firstThrow)) {
          if (secondThrow) {
            if (isSpare(secondThrow)) {
              setFrameState('Third Throw', activeFrame.index)
            } else {
              setFrameState('Done', activeFrame.index)
            }
          } else {
            setFrameState('Second Throw', activeFrame.index)
          }
        }
      }
    }
  }
  return (
      <div className='scoreCardRow'>
        {
          frameDescriptions.map(description => {
            return <Frame
                key={description.tag}
                description={description}
                isActive={activeFrame?.index === description.index}
                updateThrows={updateThrows}
                setFrameState={setFrameState}
            />
          })
        }
      </div>
  )
}