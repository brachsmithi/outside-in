import { FrameDescription } from "../models/FrameDescription";
import { configuration } from "./initializers";

export function isExtraFrame(description: FrameDescription) {
  return description.index === configuration.frameCount - 1
}

export function isLastFrame(description: FrameDescription) {
  return description.index === configuration.frameCount - 2
}

export function requiresSpecialScoring(value: string) {
  return isSpare(value) || isStrike(value)
}

export function isSpare(value: string | null) {
  return value === '/'
}

export function isStrike(value: string | null) {
  return value === 'x' || value === 'X'
}