// @ts-check
'use strict';

/**
 * Extension constants and configuration identifiers.
 */
const EXTENSION_ID = 'antigravity-ide-chat-toggle';
const EXTENSION_NAME = 'Antigravity IDE Chat Toggle';

const COMMANDS = Object.freeze({
  TOGGLE: 'antigravity-chat-toggle.toggle',
  MAXIMIZE: 'antigravity-chat-toggle.maximize',
  RESTORE: 'antigravity-chat-toggle.restore'
});

const VSCODE_COMMANDS = Object.freeze({
  TOGGLE_MAXIMIZED_AUXILIARY_BAR: 'workbench.action.toggleMaximizedAuxiliaryBar'
});

const CONFIG_SECTION = 'antigravityChatToggle';

const CONFIG_KEYS = Object.freeze({
  SHOW_STATUS_BAR: 'showStatusBarButton',
  STATUS_BAR_ALIGNMENT: 'statusBarAlignment',
  STATUS_BAR_PRIORITY: 'statusBarPriority'
});

const LABELS = Object.freeze({
  FULL_CHAT: '$(screen-full) Full Chat',
  SPLIT_VIEW: '$(screen-normal) Split View',
  TOOLTIP_FULL_CHAT: 'Expand Antigravity IDE chat to full screen (⌘+Shift+M)',
  TOOLTIP_SPLIT_VIEW: 'Return to code editor & split view in Antigravity IDE (⌘+Shift+M)'
});

module.exports = {
  EXTENSION_ID,
  EXTENSION_NAME,
  COMMANDS,
  VSCODE_COMMANDS,
  CONFIG_SECTION,
  CONFIG_KEYS,
  LABELS
};
