import * as vscode from "vscode";
import * as commands from "./commands";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(...commands.commands.map(commands.register));
}

export function deactivate() {}
