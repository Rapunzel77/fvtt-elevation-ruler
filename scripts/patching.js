/* globals
foundry,
game
*/
"use strict";

import { Patcher } from "./Patcher.js";

import { PATCHES as PATCHES_Ruler } from "./Ruler.js";
import { PATCHES as PATCHES_Token } from "./Token.js";
import { PATCHES as PATCHES_ClientKeybindings } from "./ClientKeybindings.js";
import { PATCHES as PATCHES_DrawingConfig } from "./DrawingConfig.js";

// Pathfinding
import { PATCHES as PATCHES_Wall } from "./pathfinding/Wall.js";
import { PATCHES as PATCHES_CanvasEdges } from "./pathfinding/CanvasEdges.js";
import { PATCHES as PATCHES_TokenPF } from "./pathfinding/Token.js";

// Movement tracking
import { PATCHES as PATCHES_TokenHUD } from "./token_hud.js";
import { PATCHES as PATCHES_CombatTracker } from "./CombatTracker.js";

// Settings
import { PATCHES as PATCHES_ClientSettings } from "./ModuleSettingsAbstract.js";


const mergeObject = foundry.utils.mergeObject;
const PATCHES = {
  ClientKeybindings: PATCHES_ClientKeybindings,
  ClientSettings: PATCHES_ClientSettings,
  CombatTracker: PATCHES_CombatTracker,
  ["foundry.canvas.edges.CanvasEdges"]: PATCHES_CanvasEdges,
  DrawingConfig: PATCHES_DrawingConfig,
  Ruler: PATCHES_Ruler,
  Token: mergeObject(mergeObject(PATCHES_Token, PATCHES_TokenPF), PATCHES_TokenHUD),
  Wall: PATCHES_Wall
};

export const PATCHER = new Patcher();
PATCHER.addPatchesFromRegistrationObject(PATCHES);

export function initializePatching() {
  PATCHER.registerGroup("BASIC");
  PATCHER.registerGroup("PATHFINDING");
  PATCHER.registerGroup("TOKEN_RULER");
  PATCHER.registerGroup("SPEED_HIGHLIGHTING");
  PATCHER.registerGroup("MOVEMENT_TRACKING");

  if ( game.system.id !== "dnd5e" ) PATCHER.registerGroup("MOVEMENT_SELECTION");
}

