import { FrameDescription } from "../models/FrameDescription";

export function isExtraFrame(description: FrameDescription) {
  return description.index === 10
}