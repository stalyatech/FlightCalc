# FlightCalc

Browser-based flight performance calculator for fixed-wing and VTOL RC aircraft. Estimate cruise/hover endurance, power draw, wing loading, and aerodynamic operating points from modular airframe, motor, propeller, and battery configs. Includes a config wizard for creating new component profiles. No server required — runs entirely in the browser.

![License](https://img.shields.io/badge/license-MIT-blue)

## Features

- **Multi-airframe support** — VTOL (tricopter tilt-rotor, quadplane, etc.) and fixed-wing (twin tractor, single pusher, etc.)
- **Real-time aerodynamic analysis** — airfoil polar interpolation, induced drag, stall speed, Reynolds number, L/D ratio
- **Three flight modes** — Hover + Cruise, Hover Only, Cruise Only with per-mode endurance and range
- **Altitude correction** — barometric air density model up to 3000 m MSL
- **Interactive chart** — aerodynamic operating point plotted on the airfoil polar curve
- **Safety warnings** — AUW limits, wing loading thresholds, T/W ratio checks, stall margin alerts
- **PDF export** — one-click printable report with all parameters, results, and chart
- **Config wizard** — create and edit airframe, motor, propeller, and battery configs from the browser
- **Responsive dark UI** — works on desktop and mobile

## Quick Start

Serve the project folder over HTTP (required for config file loading):

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# VS Code
# Install "Live Server" extension, right-click FlightCalc.html → Open with Live Server
```

Open `http://localhost:8000/FlightCalc.html` in your browser.

## Project Structure

```
FlightCalc/
├── FlightCalc.html          # Main calculator
├── Config.html              # Configuration wizard
├── README.md
└── config/
    ├── manifest.js           # Config loader (load order & file list)
    ├── airframes/
    │   ├── stallion-v2.js    # Flightory Stallion V2 — tricopter tilt-rotor VTOL
    │   └── moose.js          # Flightory Moose — twin tractor fixed-wing
    ├── motors/
    │   ├── t-motor-f90.js    # T-Motor F90 2806.5 1300KV
    │   ├── emax-eco2-2807.js # Emax ECO II 2807 1300KV
    │   └── brotherhobby-2812.js # BrotherHobby Avenger 2812 V5 910KV
    ├── batteries/
    │   ├── 3s.js             # 3S LiPo (11.1 V)
    │   ├── 4s.js             # 4S LiPo (14.8 V)
    │   └── 6s.js             # 6S LiPo (22.2 V)
    └── props/
        ├── gf7042.js         # Gemfan 7x4.2
        ├── hq7x55.js         # HQProp 7x5.5
        ├── hq7x4x3.js        # HQProp 7x4x3
        └── 1045.js           # 10x4.5
```

## How It Works

### Calculations

| Category | Details |
|----------|---------|
| **Aerodynamics** | Multi-point airfoil polar interpolation, Oswald efficiency induced drag, 3D stall CL, Reynolds number at cruise |
| **Power** | Cruise power from drag model, hover power from momentum theory, transition power (blended), avionics draw |
| **Endurance** | Usable battery energy (default 80% for LiPo) allocated across hover, transition, and cruise phases |
| **Safety** | User-adjustable stall margin (1.0-2.0x Vs), power safety margin (5-30%), wing loading and T/W warnings |

### Flight Modes

- **Hover + Cruise** (VTOL only) — allocates energy to hover, transition, then cruise; shows time breakdown bar
- **Hover Only** (VTOL only) — maximum hover endurance at estimated throttle
- **Cruise Only** — maximum cruise endurance and range at selected speed

### VTOL vs Fixed-Wing

When a fixed-wing airframe is selected, hover and transition controls are hidden automatically. Only cruise calculations are shown. T/W ratio warnings are adjusted for cruise-only operation.

## Adding a New Config

### Using the Config Wizard

1. Open `Config.html` (or click **New Config** from the menu)
2. Select the component tab (Airframe / Motor / Propeller / Battery)
3. Fill in the fields — aspect ratio, voltage, and slug ID are auto-calculated
4. For airframes: paste airfoil polar data in CSV format (`AoA, CL, CD` per line — XFOIL compatible)
5. Click **Save** to download the `.js` file
6. Place it in the appropriate `config/` subfolder
7. Add the file path to `config/manifest.js`

### Manually

Create a `.js` file that pushes to the appropriate `CFG` array:

```javascript
// config/airframes/my-plane.js
CFG.airframes.push({
  id:          "my-plane",
  name:        "My Custom Plane",
  type:        "fixed",              // "vtol" | "fixed"
  description: "Single pusher flying wing",

  wingArea:    0.320,                // m²
  wingAreaDm2: 32.0,                 // dm²
  wingspan:    1.500,                // m
  aspectRatio: 7.0,
  oswaldEff:   0.78,
  mac:         0.215,                // m

  airfoilName: "Clark Y",
  airfoilPolar: [                    // [AoA°, CL, CD]
    [-4, -0.10, 0.013],
    [ 0,  0.40, 0.008],
    [ 5,  0.95, 0.011],
    [10,  1.20, 0.025],
    [12,  1.10, 0.055]
  ],
  cd0Penalty:  0.006,
  clMax:       1.15,

  numMotors:       1,
  numCruiseMotors: 1,
  motorLayout:     "single-pusher",

  auwMax:            2500,           // g
  defaultFrameWeight: 900,           // g

  wlCaution: 90,                     // g/dm²
  wlDanger:  110,

  twMin:  0.6,
  twGood: 1.0,

  transitionMult: 1.0,
  usableBattery:  0.80,

  compatMotors:    [],               // empty = all allowed
  compatProps:     [],
  compatBatteries: []
});
```

Then register it in `config/manifest.js`:

```javascript
const CFG_FILES = [
  // ... existing entries ...
  'config/airframes/my-plane.js'
];
```

## Browser Compatibility

- Chrome, Edge, Firefox, Safari (modern versions)
- File save in Config Wizard uses the File System Access API where available, with automatic download fallback for browsers that don't support it (e.g., Brave, Firefox)
- Requires HTTP server — `file://` protocol is blocked by CORS for config loading

## License

MIT
