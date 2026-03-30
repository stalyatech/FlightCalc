// T-Motor F90 2806.5 1300KV Motor Configuration
// -----------------------------------------------
// Motor weight: 46.6g | Stator: 28×6.5mm | Shaft: 4mm
// Rated voltage: 5–6S | Peak current (60s): 45.1A | Ri: 76mΩ
//
// 6S thrust: bench-tested @24.2V, derated ×0.87 for nominal 22.2V flight voltage.
//   GF 7042  bench: 2117g @41.3A → ~1850g nominal
//   HQ 70403 bench: 2361g @45.1A → ~2050g nominal
//   HQ 7×5.5 no bench data, estimated between GF7042 and HQ70403.
// 4S thrust: voltage-power scaled from 6S bench (below rated range, use with caution).
//
// hoverEff  = overall hover efficiency (momentum-theory ideal ÷ electrical), ~0.55 @hover throttle
// cruiseEff = cruise propulsive efficiency (2 front motors, advance-ratio dependent)
//
// propData keys must match prop config IDs.

CFG.motors.push({
  id:           "t-motor-f90",
  name:         "T-Motor F90",
  kv:           1300,
  cells:        [4, 6],
  defaultCells: 6,
  propData: {
    "4": {
      "gf7042":  { thrust: 1000, hoverEff: 0.53, cruiseEff: 0.64 },
      "hq7x55":  { thrust: 1060, hoverEff: 0.48, cruiseEff: 0.58 },
      "hq7x4x3": { thrust: 1130, hoverEff: 0.47, cruiseEff: 0.59 }
    },
    "6": {
      "gf7042":  { thrust: 1850, hoverEff: 0.55, cruiseEff: 0.68 },
      "hq7x55":  { thrust: 1950, hoverEff: 0.51, cruiseEff: 0.62 },
      "hq7x4x3": { thrust: 2050, hoverEff: 0.49, cruiseEff: 0.63 }
    }
  }
});
