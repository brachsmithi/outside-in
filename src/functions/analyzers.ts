import { FrameDescription } from "../models/FrameDescription";

export function isExtraFrame(description: FrameDescription) {
  return description.index === 10
}

export function isLastFrame(description: FrameDescription) {
  return description.index === 9
}