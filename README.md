# VS Code Util Commands

Extension for Visual Studio Code that provides a set of useful commands.

## Commands

| identifier                                | description                                                        |
| ----------------------------------------- | ------------------------------------------------------------------ |
| `editor.action.revealTypeDefinitionAside` | like `editor.action.revealDefinitionAside` but for type definition |

## How to use the commands

### By Keybindings

Add a keybinding to the command in your `keybindings.json` file (open by run **Preferences: Open Keyboard Shortcuts (JSON)** from the Command Palette).

For example

```json
  {
    "key": "cmd+k cmd+t f12",
    "command": "editor.action.revealTypeDefinitionAside",
    "when": "editorHasTypeDefinitionProvider && editorTextFocus && !isInEmbeddedEditor"
  },
```

### By vscodevim.vim extension

See the **Key Remapping** section of vscodevim.vim's documentation: https://github.com/VSCodeVim/Vim?tab=readme-ov-file#key-remapping
