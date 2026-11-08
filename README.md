# Antigravity Chat Toggle

A lightweight, zero-dependency extension for **Antigravity IDE** (and VS Code) that gives you a quick **one-click button** and shortcut to expand the AI chat window to full screen and restore normal split view.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

---

## Features

- 🖱️ **One-Click Toggle Button**: Adds a status bar button (`Expand Chat` / `Restore Chat`) to instantly maximize or restore the chat window.
- ⌨️ **Keyboard Shortcut**: Press `Cmd + Shift + M` (macOS) or `Ctrl + Shift + M` (Windows / Linux) to toggle without lifting your hands from the keyboard.
- ⚡ **Zero Dependencies**: Pure vanilla JavaScript implementation. Runs immediately without any build steps or bloat.
- 🔄 **Bidirectional**: Switches seamlessly between full-screen chat focus mode and standard multi-pane editor view.

---

## How It Works

Antigravity Chat is hosted in the IDE's Auxiliary Bar (Secondary Side Bar). When clicked, this extension invokes the native workspace command `workbench.action.toggleMaximizedAuxiliaryBar` to collapse the editor area and allocate 100% of the screen width to the Antigravity chat interface.

Clicking it again restores the previous editor layout.

---

## Installation

### Method 1: Local Installation in Antigravity IDE (Instant)

Copy this folder directly into your Antigravity IDE extensions directory:

```bash
# macOS
cp -r ~/Desktop/antigravity-chat-toggle ~/.antigravity-ide/extensions/

# Linux
cp -r ~/Desktop/antigravity-chat-toggle ~/.antigravity-ide/extensions/

# Windows (PowerShell)
Copy-Item -Recurse ~/Desktop/antigravity-chat-toggle ~/.antigravity-ide/extensions/
```

Then reload or restart Antigravity IDE (`Cmd + Shift + P` -> **Developer: Reload Window**).

---

### Method 2: Package as VSIX

If you have `@vscode/vsce` installed:

```bash
npx @vscode/vsce package
```

Then install the generated `.vsix` file via:
1. Open Antigravity IDE.
2. Go to the **Extensions** view (`Cmd + Shift + X`).
3. Click the `...` menu at the top of the Extensions view.
4. Select **Install from VSIX...** and pick the `.vsix` file.

---

## Keyboard Shortcuts

| Platform | Shortcut | Action |
| :--- | :--- | :--- |
| **macOS** | `Cmd + Shift + M` | Toggle Full Screen / Normal View |
| **Windows / Linux** | `Ctrl + Shift + M` | Toggle Full Screen / Normal View |

You can customize this keybinding anytime by searching for `Antigravity Chat: Toggle Full Screen Chat` under **Preferences: Open Keyboard Shortcuts**.

---

## License

This project is licensed under the [MIT License](LICENSE).
