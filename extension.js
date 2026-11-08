const vscode = require('vscode');

let statusBarButton;
let isMaximized = false;

/**
 * Updates the status bar button icon, text, and tooltip based on state.
 */
function updateButtonState() {
  if (!statusBarButton) return;

  if (isMaximized) {
    statusBarButton.text = '$(screen-normal) Split View';
    statusBarButton.tooltip = 'Return to code editor & split view in Antigravity IDE (⌘+Shift+M)';
  } else {
    statusBarButton.text = '$(screen-full) Full Chat';
    statusBarButton.tooltip = 'Expand Antigravity IDE chat to full screen (⌘+Shift+M)';
  }
}

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Register the toggle command
  const toggleCommand = vscode.commands.registerCommand(
    'antigravity-chat-toggle.toggle',
    async () => {
      try {
        await vscode.commands.executeCommand(
          'workbench.action.toggleMaximizedAuxiliaryBar'
        );
        isMaximized = !isMaximized;
        updateButtonState();
      } catch (err) {
        vscode.window.showErrorMessage(
          `Unable to toggle Antigravity IDE chat window: ${err && err.message ? err.message : err}`
        );
      }
    }
  );

  // Create a clickable Status Bar button
  statusBarButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000
  );
  statusBarButton.command = 'antigravity-chat-toggle.toggle';
  updateButtonState();
  statusBarButton.show();

  context.subscriptions.push(toggleCommand, statusBarButton);
}

/**
 * Deactivates the extension.
 */
function deactivate() {
  if (statusBarButton) {
    statusBarButton.dispose();
  }
}

module.exports = {
  activate,
  deactivate
};
