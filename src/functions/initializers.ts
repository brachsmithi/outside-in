import { FrameDescription } from "../models/FrameDescription";

export function createFrameDescriptions(): FrameDescription[] {
  const descriptions: FrameDescription[] = []
  for (let i = 0; i < 10; i++) {
    descriptions.push({
      index: i,
      tag: `frame${i + 1}`,
      score: null,
    })
  }
  return descriptions
}
