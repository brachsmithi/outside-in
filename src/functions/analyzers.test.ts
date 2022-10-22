import { createFrameDescriptions } from "./initializers";
import { isExtraFrame } from "./analyzers";

describe('analyzers', () => {
  describe('isExtraFrame', () => {
    it('identifies extra frame', ()=> {
      const descriptions = createFrameDescriptions()
      for (let i = 0; i < 10; i++) {
        expect(isExtraFrame(descriptions[i])).toBeFalsy()
      }
      expect(isExtraFrame(descriptions[10])).toBeTruthy()
    })
  })
})