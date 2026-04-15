// Flightory Moose — Twin Tractor Fixed-Wing
// -------------------------------------------
// Wing: Selig S3021, 1600mm span, 36.5 dm² area
// Config: 2 wing-mounted tractor motors, V-tail
// Launch: Hand launch
// Source: Flightory Moose Manual

CFG.airframes.push({
  id:          "moose",
  name:        "Flightory Moose",
  type:        "fixed",
  description: "Twin tractor fixed-wing, V-tail",

  // Wing geometry
  wingArea:    0.365,       // m²
  wingAreaDm2: 36.5,        // dm²
  wingspan:    1.600,       // m
  aspectRatio: 7.0,
  oswaldEff:   0.80,
  mac:         0.230,       // m (mean aerodynamic chord)

  // Fuselage bounding-box (for Gazebo inertia calc, solid-box approx)
  fuselageLength: 1.050,     // m  (X, forward)
  fuselageHeight: 0.180,     // m  (Z, vertical)

  // Center of gravity (link origin assumed at nose tip, Y=0 by symmetry)
  cogX:            0.500,    // m  (from nose along X; ~25% MAC typical)
  cogZ:            0.000,    // m  (+ = above mid-height, - = below)

  // Airfoil — Selig S3021 at Re ≈ 250k
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
  cd0Penalty:  0.007,       // surface roughness (3D-printed LW-PLA/ASA)
  clMax:       1.1,         // 3D stall CL

  // Motor configuration
  numMotors:       2,       // twin tractor
  numCruiseMotors: 2,       // both used in cruise
  motorLayout:     "twin-tractor",

  // Design limits
  auwMax:            4500,  // g
  defaultFrameWeight: 1400, // g (frame + electronics)

  // Wing loading thresholds (g/dm²)
  wlCaution: 100,
  wlDanger:  120,

  // T/W thresholds (for static thrust reference)
  twMin:  0.8,
  twGood: 1.2,

  // Power model
  transitionMult: 1.0,      // no transition phase (fixed-wing)
  usableBattery:  0.80,     // LiPo usable fraction

  // Compatibility filters (empty = all allowed)
  compatMotors:    [],
  compatProps:     [],
  compatBatteries: []
});
