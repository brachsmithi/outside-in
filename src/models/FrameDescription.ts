import { FrameStateEnum } from "./stateEnums";

export type FrameDescription = {
  index: number;
  tag: string;
  score: number | null;
  firstThrow: string | null;
  secondThrow: string | null;
  frameState: FrameStateEnum;
}