// Flightory Stork VTOL — 4+1 Quadplane (Fixed Lift + Pusher)
// -----------------------------------------------------------
// Wing:    Selig S3021, 1620mm span, 24 dm² area
// Config:  4 fixed lift motors + 1 rear pusher, V-tail
// Battery: single 4S–6S Li-Ion / Li-Po pack
// Launch:  VTOL (vertical takeoff)
// Source:  Flightory Stork VTOL Pack product page + design blog

CFG.airframes.push({
  id:          "stork-vtol",
  name:        "Flightory Stork VTOL",
  type:        "vtol",
  description: "4+1 quadplane, V-tail pusher, fixed lift motors",

  // Wing geometry
  wingArea:    0.240,       // m²  (24 dm² per Flightory design blog)
  wingAreaDm2: 24.0,        // dm²
  wingspan:    1.620,       // m
  aspectRatio: 10.9,        // high-AR endurance design
  oswaldEff:   0.80,
  mac:         0.148,       // m  (area/span derived)

  // Fuselage bounding-box (for Gazebo inertia calc, solid-box approx)
  fuselageLength: 1.000,    // m  (X, forward)
  fuselageHeight: 0.170,    // m  (Z, vertical)

  // Center of gravity (link origin assumed at nose tip, Y=0 by symmetry)
  cogX:            0.450,   // m  (~45% of fuselage length, pusher-class typical)
  cogZ:            0.000,   // m  (+ above mid, - below)

  // Airfoil — Selig S3021 at Re ≈ 250k (same polar as Moose, identical airfoil)
  airfoilName: "Selig S3021",
  airfoilPolar: [
    [-4, -0.20, 0.014],
    [-2,  0.05, 0.010],
    [-1,  0.20, 0.009],
    [ 0,  0.35, 0.0080],
    [ 1,  0.48, 0.0075],
    [ 2,  0.62, 0.0074],
    [ 3,  0.75, 0.0078],
    [ 4,  0.87, 0.0088],
    [ 5,  0.98, 0.0105],
    [ 6,  1.08, 0.0130],
    [ 7,  1.15, 0.0165],
    [ 8,  1.20, 0.0210],
    [ 9,  1.22, 0.0280],
    [10,  1.20, 0.0370],
    [11,  1.14, 0.0490],
    [12,  1.05, 0.0650]
  ],
  cd0Penalty:  0.009,       // VTOL arms add parasite drag vs clean Moose (0.007)
  clMax:       1.1,         // 3D stall CL

  // Motor configuration
  numMotors:       4,       // 4 lift motors (quad)
  numCruiseMotors: 1,       // single rear pusher
  motorLayout:     "quadplane-4+1",

  // Design limits
  auwMax:            3100,  // g  (Flightory stated max)
  defaultFrameWeight: 1800, // g  (frame + VTOL hardware + electronics, ex-battery)

  // Wing loading thresholds (g/dm²)
  // 3100g / 24dm² = 129 g/dm² — high but normal for this airframe class
  wlCaution: 110,
  wlDanger:  135,

  // T/W thresholds (VTOL hover margin)
  twMin:  1.3,
  twGood: 1.6,

  // Power model
  transitionMult: 1.2,      // quadplane transition: avg(hover,cruise) × 1.2
  usableBattery:  0.80,     // LiPo usable fraction

  // Compatibility filters (empty = all allowed)
  compatMotors:    [],
  compatProps:     [],
  compatBatteries: [],

  // Hover and cruise use different motors — UI shows split selectors
  motorConfig: {
    mode: "split",
    hover:  { defaultMotor: "t-motor-f90",       defaultProp: "gf7042" },
    cruise: { defaultMotor: "brotherhobby-2812", defaultProp: "1045"   }
  }
});
