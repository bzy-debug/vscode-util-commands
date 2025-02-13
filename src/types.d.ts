import type * as vscode from "vscode";

export type Command = {
  kind: "command";
  identifier: string;
  handler: Parameters<typeof vscode.commands.registerCommand>[1];
};

export type TextEditorCommand = {
  kind: "text-editor-command";
  identifier: string;
  handler: Parameters<typeof vscode.commands.registerTextEditorCommand>[1];
};

export type TCommand = Command | TextEditorCommand;
