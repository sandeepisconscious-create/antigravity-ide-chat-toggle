// @ts-check
'use strict';

const vscode = require('vscode');
const { COMMANDS, CONFIG_SECTION } = require('./constants');
const { StateManager } = require('./stateManager');
const { StatusBarController } = require('./statusBar');
const logger = require('./logger');

/** @type {StateManager | null} */
let stateManager = null;
/** @type {StatusBarController | null} */
let statusBarController = null;

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  logger.info('Activating Antigravity IDE Chat Toggle extension');

  stateManager = new StateManager();
  statusBarController = new StatusBarController(stateManager);

  // Register commands
  const toggleCmd = vscode.commands.registerCommand(
    COMMANDS.TOGGLE,
    async () => {
      if (stateManager) {
        await stateManager.toggle();
      }
    }
  );

  const maximizeCmd = vscode.commands.registerCommand(
    COMMANDS.MAXIMIZE,
    async () => {
      if (stateManager) {
        await stateManager.maximize();
      }
    }
  );

  const restoreCmd = vscode.commands.registerCommand(
    COMMANDS.RESTORE,
    async () => {
      if (stateManager) {
        await stateManager.restore();
      }
    }
  );

  // Listen for configuration changes
  const configListener = vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration(CONFIG_SECTION)) {
      logger.info('Configuration changed, rebuilding UI components');
      statusBarController?.rebuild();
    }
  });

  context.subscriptions.push(
    stateManager,
    statusBarController,
    toggleCmd,
    maximizeCmd,
    restoreCmd,
    configListener
  );

  logger.info('Antigravity IDE Chat Toggle extension successfully activated');
}

/**
 * Deactivates the extension.
 */
function deactivate() {
  logger.info('Deactivating Antigravity IDE Chat Toggle extension');
  statusBarController?.dispose();
  stateManager?.dispose();
  logger.disposeLogger();
  stateManager = null;
  statusBarController = null;
}

module.exports = {
  activate,
  deactivate
};
