// @ts-check
'use strict';

const vscode = require('vscode');
const { EXTENSION_NAME } = require('./constants');

/** @type {vscode.OutputChannel | null} */
let outputChannel = null;

/**
 * Initializes and returns the extension output channel.
 * @returns {vscode.OutputChannel}
 */
function getLogger() {
  if (!outputChannel) {
    outputChannel = vscode.window.createOutputChannel(EXTENSION_NAME);
  }
  return outputChannel;
}

/**
 * Logs an informational message.
 * @param {string} message
 */
function info(message) {
  const timestamp = new Date().toISOString();
  getLogger().appendLine(`[INFO  ${timestamp}] ${message}`);
}

/**
 * Logs an error message with stack trace if available.
 * @param {string} message
 * @param {unknown} [error]
 */
function error(message, error) {
  const timestamp = new Date().toISOString();
  let details = '';
  if (error instanceof Error) {
    details = `\n${error.stack || error.message}`;
  } else if (error) {
    details = ` Details: ${JSON.stringify(error)}`;
  }
  getLogger().appendLine(`[ERROR ${timestamp}] ${message}${details}`);
}

/**
 * Disposes the output channel.
 */
function disposeLogger() {
  if (outputChannel) {
    outputChannel.dispose();
    outputChannel = null;
  }
}

module.exports = {
  getLogger,
  info,
  error,
  disposeLogger
};
