import { FrameDescription } from "../models/FrameDescription";
import { Configuration } from "../models/Configuration";

export const configuration: Configuration = {
  frameCount: 10
}

export function createFrameDescriptions(): FrameDescription[] {
  const descriptions: FrameDescription[] = []
  for (let i = 0; i < configuration.frameCount; i++) {
    descriptions.push({
      index: i,
      tag: `frame${i + 1}`,
      score: null,
      firstThrow: null,
      secondThrow: null,
      frameState: 'Not Started'
    })
  }
  return descriptions
}
