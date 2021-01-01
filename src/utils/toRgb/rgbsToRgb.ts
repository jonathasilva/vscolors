export function rgbToRgb(rgbArr: number[]) {
  return `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
}

export function rgbaToRgba([r, g, b, a]: number[]) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function rgbaToRgb([r, g, b, a]: number[]) {
  if (a === 1) {
    return rgbToRgb([r, g, b]);
  } else if (a < 1) {
    return rgbaToRgba([r, g, b, a]);
  } else {
    throw new Error('error in rgbaToRgb()');
  }
}