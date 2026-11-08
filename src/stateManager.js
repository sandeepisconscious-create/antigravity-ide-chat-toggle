// @ts-check
'use strict';

const vscode = require('vscode');
const { VSCODE_COMMANDS } = require('./constants');
const logger = require('./logger');

class StateManager {
  constructor() {
    /** @type {boolean} */
    this._isMaximized = false;
    /** @type {vscode.EventEmitter<boolean>} */
    this._onDidChangeState = new vscode.EventEmitter();
    /** @type {vscode.Event<boolean>} */
    this.onDidChangeState = this._onDidChangeState.event;
  }

  /**
   * Current maximized state.
   * @returns {boolean}
   */
  get isMaximized() {
    return this._isMaximized;
  }

  /**
   * Toggles between full-screen chat and normal split view.
   * @returns {Promise<boolean>} Resulting maximized state.
   */
  async toggle() {
    logger.info(`Toggling chat view (currently maximized: ${this._isMaximized})`);
    try {
      await vscode.commands.executeCommand(
        VSCODE_COMMANDS.TOGGLE_MAXIMIZED_AUXILIARY_BAR
      );
      this._isMaximized = !this._isMaximized;
      this._onDidChangeState.fire(this._isMaximized);
      logger.info(`Toggled successfully. New state: maximized=${this._isMaximized}`);
      return this._isMaximized;
    } catch (err) {
      logger.error('Failed to execute toggle command', err);
      this._showErrorNotification('Failed to toggle chat window', err);
      throw err;
    }
  }

  /**
   * Forces chat to maximize if not already maximized.
   */
  async maximize() {
    if (!this._isMaximized) {
      return this.toggle();
    }
    return this._isMaximized;
  }

  /**
   * Restores chat to normal split view if currently maximized.
   */
  async restore() {
    if (this._isMaximized) {
      return this.toggle();
    }
    return this._isMaximized;
  }

  /**
   * Shows user error message with an action to inspect the output log.
   * @private
   * @param {string} prefix
   * @param {unknown} err
   */
  async _showErrorNotification(prefix, err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    const action = await vscode.window.showErrorMessage(
      `${prefix}: ${errorMsg}`,
      'Show Output Logs'
    );
    if (action === 'Show Output Logs') {
      logger.getLogger().show();
    }
  }

  /**
   * Disposes the event emitter.
   */
  dispose() {
    this._onDidChangeState.dispose();
  }
}

module.exports = {
  StateManager
};
