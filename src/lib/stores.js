import { writable } from "svelte/store";

// Create state objects with initial values
export const gameState = writable({
  phase: "settings",
  state: "countdown",
  settings: {
    players: [],
    lives: 5,
    time: 60,
    punishmentsChoice: false,
    punishments: [],
  },
  players: {
    active: [],
    dead: [],
    currentTurn: 0,
  },
});

// Helper functions to update state
export function updateGamePhase(newPhase) {
  gameState.update((state) => ({
    ...state,
    phase: newPhase,
  }));
}

export function updateGameState(newState) {
  gameState.update((state) => ({
    ...state,
    state: newState,
  }));
}

export function updateSettings(newSettings) {
  gameState.update((state) => ({
    ...state,
    settings: {
      ...state.settings,
      ...newSettings,
    },
  }));
}

export function updatePlayers(players) {
  gameState.update((state) => ({
    ...state,
    players: {
      ...state.players,
      ...players,
    },
  }));
}

export function updateSettingsPlayers(players) {
  gameState.update((state) => ({
    ...state,
    settings: {
      ...state.settings,
      players: [
        ...state.settings.players,
        ...players,
      ],
    },
  }));
}