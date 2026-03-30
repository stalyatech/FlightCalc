# FlightCalc

Flight performance calculator for fixed-wing and VTOL RC aircraft. Select an airframe, motor, propeller, and battery — get real-time endurance, range, power draw, wing loading, and aerodynamic analysis. Add new components through the built-in config wizard.

## Features

- **VTOL & Fixed-Wing** — supports tricopter tilt-rotor, twin tractor, and other layouts with automatic UI adaptation
- **Aerodynamic Analysis** — airfoil polar interpolation, induced drag (Oswald), stall speed, Reynolds number, L/D ratio
- **Flight Modes** — Hover + Cruise, Hover Only, Cruise Only with energy allocation breakdown
- **Altitude Correction** — barometric air density model (0–3000 m MSL)
- **Operating Point Chart** — current flight condition plotted on the airfoil polar curve
- **Safety Warnings** — AUW limits, wing loading, T/W ratio, stall margin alerts
- **PDF Export** — printable report with parameters, results, warnings, and chart
- **Config Wizard** — create and edit airframe, motor, propeller, and battery configs from the browser
- **Responsive Dark UI** — desktop and mobile

## Usage

Open `FlightCalc.html` in a browser. Select your airframe, motor, propeller, and battery from the dropdowns. Adjust sliders for payload, cruise speed, altitude, and other parameters. Results update in real time.

> **Note:** Config files are loaded dynamically via JavaScript. Some browsers block this when opening from `file://`. If configs don't load, use any local HTTP server (e.g., VS Code Live Server extension) or a browser that allows local file access.

## Project Structure

```
FlightCalc/
├── FlightCalc.html            # Main calculator
├── Config.html                # Config wizard (create & edit components)
└── config/
    ├── manifest.js            # File list & load order
    ├── airframes/
    │   ├── stallion-v2.js     # Stallion V2 — tricopter tilt-rotor VTOL
    │   └── moose.js           # Moose — twin tractor fixed-wing
    ├── motors/
    │   ├── t-motor-f90.js     # T-Motor F90 1300KV
    │   ├── emax-eco2-2807.js  # Emax ECO II 2807 1300KV
    │   └── brotherhobby-2812.js # BrotherHobby Avenger 2812 910KV
    ├── batteries/
    │   ├── 3s.js              # 3S LiPo (11.1V)
    │   ├── 4s.js              # 4S LiPo (14.8V)
    │   └── 6s.js              # 6S LiPo (22.2V)
    └── props/
        ├── gf7042.js          # Gemfan 7x4.2
        ├── hq7x55.js          # HQProp 7x5.5
        ├── hq7x4x3.js         # HQProp 7x4x3
        └── 1045.js            # 10x4.5
```

## Adding a New Component

### Config Wizard

Open `Config.html` or click **New Config** from the calculator menu. Pick the component type (Airframe / Motor / Propeller / Battery), fill in the fields, and save. For airframes, paste airfoil polar data in CSV format (`AoA, CL, CD` per line — XFOIL output works directly). After saving, add the file path to `config/manifest.js`.

### Manual

Create a `.js` file that pushes to the matching `CFG` array. Example for a fixed-wing airframe:

```javascript
// config/airframes/my-plane.js
CFG.airframes.push({
  id:              "my-plane",
  name:            "My Custom Plane",
  type:            "fixed",           // "vtol" | "fixed"
  description:     "Single pusher flying wing",

  wingArea:        0.320,             // m²
  wingAreaDm2:     32.0,              // dm²
  wingspan:        1.500,             // m
  aspectRatio:     7.0,
  oswaldEff:       0.78,
  mac:             0.215,             // m

  airfoilName:     "Clark Y",
  airfoilPolar:    [                  // [AoA°, CL, CD]
    [-4, -0.10, 0.013],
    [ 0,  0.40, 0.008],
    [ 5,  0.95, 0.011],
    [10,  1.20, 0.025],
    [12,  1.10, 0.055]
  ],
  cd0Penalty:      0.006,
  clMax:           1.15,

  numMotors:       1,
  numCruiseMotors: 1,
  motorLayout:     "single-pusher",

  auwMax:          2500,              // g
  defaultFrameWeight: 900,            // g
  wlCaution:       90,               // g/dm²
  wlDanger:        110,
  twMin:           0.6,
  twGood:          1.0,

  transitionMult:  1.0,
  usableBattery:   0.80,

  compatMotors:    [],                // empty = all allowed
  compatProps:     [],
  compatBatteries: []
});
```

Add the path to `config/manifest.js`:

```javascript
const CFG_FILES = [
  // ... existing entries ...
  'config/airframes/my-plane.js'
];
```

## License

MIT
