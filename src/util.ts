import * as vscode from "vscode";

export async function executeTypeDefinitionProvider(
  uri: vscode.Uri,
  position: vscode.Position,
): Promise<vscode.Location[] | vscode.LocationLink[]> {
  return await vscode.commands.executeCommand(
    "vscode.executeTypeDefinitionProvider",
    uri,
    position,
  );
}

export function peekLocations(
  uri: vscode.Uri,
  position: vscode.Position,
  locations: vscode.Location[] | vscode.LocationLink[],
): Thenable<void> {
  return vscode.commands.executeCommand(
    "editor.action.peekLocations",
    uri,
    position,
    locations,
    "peek",
  );
}
