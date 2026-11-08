// @ts-check
'use strict';

const vscode = require('vscode');
const {
  COMMANDS,
  CONFIG_SECTION,
  CONFIG_KEYS,
  LABELS
} = require('./constants');
const logger = require('./logger');

class StatusBarController {
  /**
   * @param {import('./stateManager').StateManager} stateManager
   */
  constructor(stateManager) {
    this._stateManager = stateManager;
    /** @type {vscode.StatusBarItem | null} */
    this._item = null;
    /** @type {vscode.Disposable[]} */
    this._disposables = [];

    // Subscribe to state changes
    this._disposables.push(
      this._stateManager.onDidChangeState((isMaximized) => {
        this.updateLabel(isMaximized);
      })
    );

    // Initial render
    this.rebuild();
  }

  /**
   * Reads current user configuration for status bar.
   * @private
   */
  _getConfig() {
    const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
    const visible = config.get(CONFIG_KEYS.SHOW_STATUS_BAR, true);
    const alignmentString = config.get(CONFIG_KEYS.STATUS_BAR_ALIGNMENT, 'right');
    const priority = config.get(CONFIG_KEYS.STATUS_BAR_PRIORITY, 1000);

    const alignment =
      alignmentString.toLowerCase() === 'left'
        ? vscode.StatusBarAlignment.Left
        : vscode.StatusBarAlignment.Right;

    return { visible, alignment, priority };
  }

  /**
   * Builds or rebuilds the status bar item according to settings.
   */
  rebuild() {
    if (this._item) {
      this._item.dispose();
      this._item = null;
    }

    const { visible, alignment, priority } = this._getConfig();

    if (!visible) {
      logger.info('Status bar button disabled by user settings');
      return;
    }

    this._item = vscode.window.createStatusBarItem(alignment, priority);
    this._item.command = COMMANDS.TOGGLE;
    this.updateLabel(this._stateManager.isMaximized);
    this._item.show();
    logger.info('Status bar button mounted and visible');
  }

  /**
   * Updates button text and tooltip based on state.
   * @param {boolean} isMaximized
   */
  updateLabel(isMaximized) {
    if (!this._item) return;

    if (isMaximized) {
      this._item.text = LABELS.SPLIT_VIEW;
      this._item.tooltip = LABELS.TOOLTIP_SPLIT_VIEW;
    } else {
      this._item.text = LABELS.FULL_CHAT;
      this._item.tooltip = LABELS.TOOLTIP_FULL_CHAT;
    }
  }

  /**
   * Disposes the controller and UI item.
   */
  dispose() {
    if (this._item) {
      this._item.dispose();
      this._item = null;
    }
    this._disposables.forEach((d) => d.dispose());
    this._disposables = [];
  }
}

module.exports = {
  StatusBarController
};
