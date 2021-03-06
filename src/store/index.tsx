import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import DeltaE from "delta-e";
import { LABColor, Picker, RgbColor, Shade, ShadeDistance } from "../types";
import { getRgbString, rgbToLab } from "../utils";

console.log("🔥 store");

export const SETTINGS = {
  results: 6,
};

const initialColor = {
  r: 0,
  g: 255,
  b: 124,
};

const initialSearch = (rgb: RgbColor) => {
  console.log("🧰 initialSearch", rgb);
  return {
    candidate: rgb,
    colorPicker: rgb,
    inputValue: getRgbString(rgb),
    inputValid: true,
    format: "rgb",
  };
};

export const searchAtom = atomWithStorage<Picker>(
  "search",
  initialSearch(initialColor)
);

export const settingsAtom = atomWithStorage("settings", { results: 4 });

export const listAtom = atomWithStorage<string[]>("list", ["css"]);

export const shadesAtom = atom<Shade[]>([]);

export const shadesSortedAtom = atom<ShadeDistance[]>((get) => {
  console.log("🌌 shadesSortedAtom");
  const mainColorLAB: LABColor = rgbToLab(get(searchAtom).candidate);
  const shadesWithDistance = get(shadesAtom).map((shade) => {
    return { ...shade, distance: DeltaE.getDeltaE00(shade.LAB, mainColorLAB) };
  });

  return shadesWithDistance.sort(function (a, b) {
    return a.distance - b.distance;
  });
});

export const favAtom = atomWithStorage<ShadeDistance[]>("favorites", []);
