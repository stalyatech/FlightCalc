// Flight Calculator — Configuration Manifest
// ---------------------------------------------
// To add a new component:
//   1. Create a .js file in the appropriate folder
//   2. Add its path to CFG_FILES below
//
// Load order: Props → Batteries → Motors → Airframes

const CFG = { airframes: [], motors: [], batteries: [], props: [] };

const CFG_FILES = [
  // — Props (load first) —
  'config/props/gf7042.js',
  'config/props/hq7x55.js',
  'config/props/hq7x4x3.js',
  'config/props/1045.js',

  // — Batteries —
  'config/batteries/3s.js',
  'config/batteries/4s.js',
  'config/batteries/6s.js',

  // — Motors —
  'config/motors/t-motor-f90.js',
  'config/motors/emax-eco2-2807.js',
  'config/motors/brotherhobby-2812.js',

  // — Airframes —
  'config/airframes/stallion-v2.js',
  'config/airframes/moose.js'
];
