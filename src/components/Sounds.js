import UIfx from "uifx";
import popAsset from "../assets/pop.wav";
import successAsset from "../assets/success.mp3";
import flipAsset from "../assets/flip.wav";
import failedAsset from "../assets/fail.wav";

const sound = (asset, volume) => {
  const s = new UIfx(asset);
  s.setVolume(volume || 0.5);
  return s;
};

const sounds = {
  pop: sound(popAsset),
  flip: sound(flipAsset, 1.0),
  success: sound(successAsset),
  fail: sound(failedAsset)
};

export const playSound = kind => {
  switch (kind) {
    case "pop":
      sounds.pop.play();
      break;
    case "flip":
      sounds.flip.play();
      break;
    case "success":
      sounds.success.play();
      break;
    case "fail":
      sounds.fail.play();
      break;
    default:
    // do nothing
  }
};
