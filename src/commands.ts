import * as vscode from "vscode";
import * as util from "./util";

type Command = {
  kind: "command";
  identifier: string;
  handler: Parameters<typeof vscode.commands.registerCommand>[1];
};

type TextEditorCommand = {
  kind: "text-editor-command";
  identifier: string;
  handler: Parameters<typeof vscode.commands.registerTextEditorCommand>[1];
};

type TCommand = Command | TextEditorCommand;

export function register(command: TCommand): vscode.Disposable {
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

const revealTypeDefinitionAside: TextEditorCommand = {
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

export const commands: TCommand[] = [revealTypeDefinitionAside];
