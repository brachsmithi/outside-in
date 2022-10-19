import { FrameDescription } from "../models/FrameDescription";

export function createFrameDescriptions(): FrameDescription[] {
  const descriptions: FrameDescription[] = []
  for (let i = 0; i < 11; i++) {
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
