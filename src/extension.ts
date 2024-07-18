// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getColorType, getRealWordRange } from './utils/getColorType';
import { formatColor } from './utils/format';
import { toHex } from './utils/toHex';
import { toRgb } from './utils/toRgb';
import { toRgba } from './utils/toRgba';
import { toHsl } from './utils/toHsl';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) 
{

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "VSColors" is now active!');
  
  const color2Hex = vscode.commands.registerCommand('vscolors.color2Hex', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
			const document = editor.document;
      const realWordRange = getRealWordRange();

      if(realWordRange === false) return;

      const currentWord = document.getText(realWordRange).trim();
      const colorType = getColorType(currentWord);

      const formatedColor = formatColor(colorType);
      const hex = toHex(formatedColor);

      const selection = new vscode.Selection(realWordRange.start, realWordRange.end);

      editor.edit(editBuilder => 
      {
        editBuilder.replace(selection, hex);
      });
		}
  });

  const color2Rgb = vscode.commands.registerCommand('vscolors.color2Rgb', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
			const document = editor.document;
      const realWordRange = getRealWordRange();

      if(realWordRange === false) return;

      const currentWord = document.getText(realWordRange).trim();
      const colorType = getColorType(currentWord);

      const formatedColor = formatColor(colorType);
      const rgb = toRgb(formatedColor);

      const selection = new vscode.Selection(realWordRange.start, realWordRange.end);

      editor.edit(editBuilder => 
      {
        editBuilder.replace(selection, rgb);
      });
		}
  });

  const color2Rgba = vscode.commands.registerCommand('vscolors.color2Rgba', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
			const document = editor.document;
      const realWordRange = getRealWordRange();

      if(realWordRange === false) return;

      const currentWord = document.getText(realWordRange).trim();
      const colorType = getColorType(currentWord);

      const formatedColor = formatColor(colorType);
      const rgb = toRgba(formatedColor);

      const selection = new vscode.Selection(realWordRange.start, realWordRange.end);

      editor.edit(editBuilder => 
      {
        editBuilder.replace(selection, rgb);
      });
		}
  });

  const color2Hsl = vscode.commands.registerCommand('vscolors.color2Hsl', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
			const document = editor.document;
      const realWordRange = getRealWordRange();

      if(realWordRange === false) return;

      const currentWord = document.getText(realWordRange).trim();
      const colorType = getColorType(currentWord);

      const formatedColor = formatColor(colorType);
      const hsl = toHsl(formatedColor);

      const selection = new vscode.Selection(realWordRange.start, realWordRange.end);

      editor.edit(editBuilder => 
      {
        editBuilder.replace(selection, hsl);
      });
		}
  });

  context.subscriptions.push(color2Hex, color2Rgb, color2Rgba, color2Hsl);
}

// this method is called when your extension is deactivated
export function deactivate() {}
