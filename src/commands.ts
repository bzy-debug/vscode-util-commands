import * as vscode from "vscode";
import * as util from "./util";
import * as types from "./types";

export function register(command: types.TCommand): vscode.Disposable {
  switch (command.kind) {
    case "command":
      return vscode.commands.registerCommand(
        command.identifier,
        command.handler,
      );
    case "text-editor-command":
      return vscode.commands.registerTextEditorCommand(
        command.identifier,
        command.handler,
      );
  }
}

const revealTypeDefinitionAside: types.TextEditorCommand = {
  kind: "text-editor-command",
  identifier: "editor.action.revealTypeDefinitionAside",
  async handler(editor) {
    const uri = editor.document.uri;
    const position = editor.selection.active;
    const locations = await util.executeTypeDefinitionProvider(uri, position);
    if (locations.length > 1) {
      await util.peekLocations(uri, position, locations);
    } else {
      const location = locations[0];
      const targetUri =
        location instanceof vscode.Location ? location.uri : location.targetUri;
      const selection =
        location instanceof vscode.Location
          ? location.range
          : location.targetSelectionRange;
      const document = await vscode.workspace.openTextDocument(targetUri);
      await vscode.window.showTextDocument(document, {
        viewColumn: vscode.ViewColumn.Beside,
        selection: selection,
      });
    }
  },
};

const runCommand: types.Command = {
  kind: "command",
  identifier: "vscode-util-commands.runCommand",
  async handler() {
    const commandId = await vscode.window.showQuickPick(
      vscode.commands.getCommands(true),
      { placeHolder: "Select a command to run" },
    );
    if (commandId === undefined) {
      return;
    }
    try {
      await vscode.commands.executeCommand(commandId);
    } catch (error) {
      if (error instanceof Error) {
        vscode.window.showErrorMessage(
          `Failed to execute command: ${error.message}`,
        );
      } else {
        vscode.window.showErrorMessage("Failed to execute command");
      }
    }
  },
};

export const commands: types.TCommand[] = [
  revealTypeDefinitionAside,
  runCommand,
];
