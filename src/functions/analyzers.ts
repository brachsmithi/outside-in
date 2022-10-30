import { FrameDescription } from "../models/FrameDescription";
import { configuration } from "./initializers";

export function isExtraFrame(description: FrameDescription) {
  return description.index === configuration.frameCount - 1
}

export function isLastFrame(description: FrameDescription) {
  return description.index === configuration.frameCount - 2
}

export function requiresSpecialScoring(value: string) {
  return value === '/' || value === 'x' || value === 'X'
}