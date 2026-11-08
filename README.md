# Antigravity Chat Toggle

A lightweight, zero-dependency extension for **Antigravity IDE** (and VS Code) that gives you a quick **one-click button** and shortcut to expand the AI chat window to full screen and return to split view.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

---

## Features

- 🖱️ **One-Click Toggle Button**: Adds a status bar button to instantly toggle between full-screen chat and split view:
  - **`Full Chat`** — Collapses the editor and expands Antigravity chat across the full screen.
  - **`Split View`** — Restores the code editor and returns to side-by-side split view.
- ⌨️ **Keyboard Shortcut**: Press `Cmd + Shift + M` (macOS) or `Ctrl + Shift + M` (Windows / Linux) to toggle instantly from anywhere.
- ⚡ **Zero Dependencies**: Pure vanilla JavaScript implementation. Runs immediately with no build steps or compile dependencies.
- 🖥️ **Toolbar Icon**: Also adds an expand icon `⛶` to the editor tab toolbar.

---

## Quick Setup / Enabling the Button

### 1. Ensure Your Status Bar is Visible
If your status bar at the bottom is hidden, enable it:
- From the top macOS menu: **View** > **Appearance** > **Status Bar**
- Or press `Cmd + Shift + P` and run **`View: Toggle Status Bar Visibility`**

### 2. How to Toggle
- **Via Button**: Click **`Full Chat`** in the bottom-right status bar to expand; click **`Split View`** to return.
- **Via Shortcut**: Press **`Cmd + Shift + M`** (macOS) or **`Ctrl + Shift + M`** (Windows/Linux).
- **Via Command Palette**: Press `Cmd + Shift + P` and search for **`Antigravity Chat: Toggle Full Chat / Split View`**.

---

## Installation

### Method 1: Local Installation in Antigravity IDE (Fastest)

Copy the repository folder directly into your Antigravity IDE extensions directory:

```bash
# macOS
cp -r ~/Desktop/antigravity-chat-toggle ~/.antigravity-ide/extensions/

# Linux
cp -r ~/Desktop/antigravity-chat-toggle ~/.antigravity-ide/extensions/

# Windows (PowerShell)
Copy-Item -Recurse ~/Desktop/antigravity-chat-toggle ~/.antigravity-ide/extensions/
```

Then reload Antigravity IDE:
1. Press `Cmd + Shift + P`.
2. Run **`Developer: Reload Window`** (or restart the IDE).

---

### Method 2: Package & Install as VSIX

1. Package the extension with `vsce`:
   ```bash
   npx @vscode/vsce package
   ```
2. In Antigravity IDE:
   - Open the **Extensions** panel (`Cmd + Shift + X`).
   - Click the `...` menu in the top-right corner of the Extensions panel.
   - Choose **Install from VSIX...** and select the `.vsix` file.

---

## Keyboard Shortcuts

| Platform | Shortcut | Action |
| :--- | :--- | :--- |
| **macOS** | `Cmd + Shift + M` | Toggle Full Chat / Split View |
| **Windows / Linux** | `Ctrl + Shift + M` | Toggle Full Chat / Split View |

To rebind to a different shortcut, open **Preferences: Open Keyboard Shortcuts (JSON)** (`Cmd + K, Cmd + S`) and search for `antigravity-chat-toggle.toggle`.

---

## Technical Details

Antigravity Chat runs within the IDE's Auxiliary Bar (Secondary Side Bar). This extension interfaces with the workbench action `workbench.action.toggleMaximizedAuxiliaryBar`, managing state dynamically and updating label indicators and accessibility tooltips on each transition.

---

## License

This project is licensed under the [MIT License](LICENSE).
