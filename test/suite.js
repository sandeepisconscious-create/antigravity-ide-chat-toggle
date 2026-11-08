// @ts-check
'use strict';

const assert = require('assert');
const { COMMANDS, LABELS, CONFIG_SECTION, CONFIG_KEYS } = require('../src/constants');

console.log('Running test suite for Antigravity IDE Chat Toggle...');

// Test 1: Verify Constants Integrity
assert.strictEqual(
  COMMANDS.TOGGLE,
  'antigravity-chat-toggle.toggle',
  'Toggle command ID should match'
);
assert.strictEqual(
  COMMANDS.MAXIMIZE,
  'antigravity-chat-toggle.maximize',
  'Maximize command ID should match'
);
assert.strictEqual(
  COMMANDS.RESTORE,
  'antigravity-chat-toggle.restore',
  'Restore command ID should match'
);
assert.strictEqual(
  CONFIG_SECTION,
  'antigravityChatToggle',
  'Config section should match'
);
assert.strictEqual(
  CONFIG_KEYS.SHOW_STATUS_BAR,
  'showStatusBarButton',
  'Config key showStatusBarButton should match'
);
assert.ok(LABELS.FULL_CHAT.includes('Full Chat'), 'Label should include Full Chat');
assert.ok(LABELS.SPLIT_VIEW.includes('Split View'), 'Label should include Split View');
console.log('✓ Constants integrity test passed');

// Test 2: Verify State Transitions with Mocked VS Code API
// Mock the vscode module for isolated unit testing
const mockDisposables = [];
const mockCommands = new Map();
const mockEventEmitters = [];

class MockEventEmitter {
  constructor() {
    this._listeners = [];
    this.event = (listener) => {
      this._listeners.push(listener);
      return { dispose: () => {} };
    };
    mockEventEmitters.push(this);
  }
  fire(data) {
    this._listeners.forEach((fn) => fn(data));
  }
  dispose() {}
}

const mockVscode = {
  commands: {
    registerCommand: (id, handler) => {
      mockCommands.set(id, handler);
      return { dispose: () => mockCommands.delete(id) };
    },
    executeCommand: async (cmd) => {
      return `executed:${cmd}`;
    }
  },
  window: {
    createStatusBarItem: () => ({
      text: '',
      tooltip: '',
      command: '',
      show: () => {},
      dispose: () => {}
    }),
    createOutputChannel: () => ({
      appendLine: () => {},
      dispose: () => {},
      show: () => {}
    }),
    showErrorMessage: async () => undefined
  },
  workspace: {
    getConfiguration: () => ({
      get: (key, def) => def
    }),
    onDidChangeConfiguration: () => ({ dispose: () => {} })
  },
  StatusBarAlignment: { Left: 1, Right: 2 },
  EventEmitter: MockEventEmitter
};

// Inject mock into require cache
const Module = require('module');
// @ts-ignore
const originalRequire = Module.prototype.require;
// @ts-ignore
Module.prototype.require = function (path) {
  if (path === 'vscode') {
    return mockVscode;
  }
  return originalRequire.apply(this, arguments);
};

// Test StateManager
const { StateManager } = require('../src/stateManager');
const state = new StateManager();
assert.strictEqual(state.isMaximized, false, 'Initial state must be false (split view)');

let emittedState = null;
state.onDidChangeState((s) => {
  emittedState = s;
});

(async () => {
  await state.toggle();
  assert.strictEqual(state.isMaximized, true, 'State after toggle must be true');
  assert.strictEqual(emittedState, true, 'EventEmitter must emit true');

  await state.restore();
  assert.strictEqual(state.isMaximized, false, 'State after restore must be false');
  assert.strictEqual(emittedState, false, 'EventEmitter must emit false');

  await state.maximize();
  assert.strictEqual(state.isMaximized, true, 'State after maximize must be true');

  console.log('✓ StateManager transitions & event emissions test passed');

  // Test Extension activate / deactivate lifecycle
  const extension = require('../src/extension');
  const mockContext = { subscriptions: [] };
  extension.activate(mockContext);
  assert.ok(mockContext.subscriptions.length > 0, 'Context subscriptions must be registered');
  console.log('✓ Extension lifecycle activation test passed');

  extension.deactivate();
  console.log('✓ Extension lifecycle deactivation test passed');

  console.log('\n========================================');
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! (5/5)');
  console.log('========================================');
})().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
