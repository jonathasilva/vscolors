import * as vscode from 'vscode';
import { FormatedColorArrayType, FormatedColorStringType } from '../format';
import { hexToRgba, hexaToRgba } from './hexsToRgba';
import { hslToRgba, hslaToRgba } from './hslsToRgba';
import { rgbToRgba, rgbaToRgba } from './rgbsToRgba';

export function toRgba(formatedColor: FormatedColorStringType | FormatedColorArrayType) {
  switch (formatedColor.type) {
    case "rgb":
      return rgbToRgba(formatedColor.value);
      break;

    case "hex":
      return hexToRgba(formatedColor.value);
      break;

    case "hsl":
      return hslToRgba(formatedColor.value);
      break;

    case "hexa":
      return hexaToRgba(formatedColor.value);
      break;

    case "rgba":
      return rgbaToRgba(formatedColor.value);
      break;
  
    case "hsla":
      return hslaToRgba(formatedColor.value);
      break;
  
    default:
      vscode.window.showErrorMessage('error from toRgb()');
      throw new Error('error from toRgb()');
      break;
  }
}