# Antigravity IDE Chat Toggle

One-click button and shortcut to toggle the **Antigravity IDE** Chat / Panel between full screen and split view.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

> **Note:** This extension is specifically built for **Antigravity IDE** (the AI-first editor built on VS Code), not the standalone Antigravity 2.0 desktop application.

---

## Features

- 🖱️ **One-Click Toggle Button**: Adds a status bar button in **Antigravity IDE** to instantly toggle between full-screen chat and split view:
  - **`Full Chat`** — Collapses the editor and expands the Antigravity IDE Chat / Panel across the full screen.
  - **`Split View`** — Restores the code editor and returns to side-by-side split view.
- ⌨️ **Keyboard Shortcut**: Press `Cmd + Shift + M` (macOS) or `Ctrl + Shift + M` (Windows / Linux) to toggle instantly inside Antigravity IDE.
- ⚡ **Zero Dependencies**: Pure vanilla JavaScript implementation. Runs immediately with no build steps or compile dependencies.
- 🖥️ **Toolbar Icon**: Also adds an expand icon `⛶` to the editor tab toolbar in Antigravity IDE.

---

## Quick Setup in Antigravity IDE

### 1. Ensure Your Status Bar is Visible
If your status bar at the bottom of Antigravity IDE is hidden:
- From the top macOS menu: **View** > **Appearance** > **Status Bar**
- Or press `Cmd + Shift + P` and run **`View: Toggle Status Bar Visibility`**

### 2. How to Toggle
- **Via Button**: Click **`Full Chat`** in the bottom-right status bar of Antigravity IDE to expand; click **`Split View`** to return.
- **Via Shortcut**: Press **`Cmd + Shift + M`** (macOS) or **`Ctrl + Shift + M`** (Windows/Linux).
- **Via Command Palette**: Press `Cmd + Shift + P` and search for **`Antigravity IDE: Toggle Full Chat / Split View`**.

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
2. Run **`Developer: Reload Window`** (or restart Antigravity IDE).

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

To rebind to a different shortcut, open **Preferences: Open Keyboard Shortcuts (JSON)** (`Cmd + K, Cmd + S`) in Antigravity IDE and search for `antigravity-chat-toggle.toggle`.

---

## Technical Details

Antigravity IDE hosts its AI Chat within the Auxiliary Bar (Secondary Side Bar) under the view container `antigravity.panel`. This extension interfaces with the native workbench action `workbench.action.toggleMaximizedAuxiliaryBar`, managing state dynamically and updating label indicators and accessibility tooltips on each transition.

---

## License

This project is licensed under the [MIT License](LICENSE).
