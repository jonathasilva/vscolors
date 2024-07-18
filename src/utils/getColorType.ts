import * as vscode from 'vscode';

export type RegexType = {
  type: string;
  regex: RegExp;
};

export type ColorType = {
  type: string,
  value: string
};

export function getRealWordRange()
{
  const editor = vscode.window.activeTextEditor;
  
  if(!editor) 
    return false;

  const document = editor.document;
  const position = editor.selection.active;
  const line = document.lineAt(position.line);
  const lineText = line.text;

  // Regex for different color formats
  const colorRegex = /#([0-9a-fA-F]{3,8})|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*\d(\.\d+)?\s*)?\)|hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)/g;
  
  let match;
  while ((match = colorRegex.exec(lineText)) !== null) 
  {
    const matchStart = match.index;
    const matchEnd = matchStart + match[0].length;
    
    if (position.character >= matchStart && position.character <= matchEnd) 
      {
      return new vscode.Range(
        new vscode.Position(position.line, matchStart),
        new vscode.Position(position.line, matchEnd)
      );
    }
  }
  
  return false;
}

export function getColorType(clr: string) {
  const colorTypes: RegexType[] = [
    {
      type: "rgb",
      regex: /^rgb\(\s?\d{1,3}%?\s?(\s?,\s?\d{1,3}%?){2}\s?\)/gi
      // precise version
      // regex: /rgb\(\s?(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])|((100|[1-9]?[0-9])\s?\%))\s?\,\s?(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])|((100|[1-9]?[0-9])\s?\%))\s?\,\s?(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])|((100|[1-9]?[0-9])\s?\%))\s?\)/gi    
    },
    {
      type: "rgba",
      regex: /^rgba\(\s?(\d{1,3}%?\s?,\s?){3}(1|0?\.\d+)\s?\)/gi
    },
    {
      type: "hsl",
      regex: /^hsl\(\s?\d{1,3}\s?(,\s?\d{1,3}%){2}\s?\)/gi
    },
    {
      type: "hsla",
      regex: /^hsla\(\s?\d{1,3}\s?(,\s?\d{1,3}%){2}\s?,\s?(1|0?\.\d+)\s?\)/gi
    },
    {
      type: "hex",
      regex: /^#([\da-f]{3}){1,2}$/gi
    },
    {
      type: "hexa",
      regex: /^#([\da-f]{4}){1,2}$/gi
    }
  ];

  const color = clr.trim();
  const matchingType = colorTypes.find((type) => type.regex.test(color) === true);
  if (!matchingType) {
    vscode.window.showErrorMessage(`Can't resolve color format of ${clr}`);
    throw Error(`Can't resolve color format of ${clr}`);
  }

  const colorType: ColorType = {
    type: matchingType.type,
    value: color
  };
  
  return colorType;
}