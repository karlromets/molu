// src/lib/stores.js
import {writable} from "svelte/store";

export let phase = writable("settings");
export let gameState = writable("countdown");
export let settings = writable({
  players: [],
  lives: 5,
  time: 60,
  punishmentsChoice: false,
  punishments: [],
});
export let gamePlayers = writable({
  players: [],
  deadPlayers: [],
  playerTurn: 0,
});
