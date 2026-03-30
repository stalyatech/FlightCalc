// Emax ECO II 2807 1300KV Motor Configuration
// ---------------------------------------------
// Motor weight: ~40g | Stator: 28×7mm | Shaft: 5mm (M5)
// Rated voltage: 3–4S | Mounting: 16×16mm
//
// 4S thrust: from community bench tests (RCBenchmark, forum data).
//   GF 7042  ~1350g @~27A
//   HQ 7×5.5 ~1600g @~38A
//   HQ 7×4×3 ~1500g @~34A
// 3S thrust: voltage-power scaled from 4S (×0.65).
//
// hoverEff  = overall hover efficiency (momentum-theory ideal ÷ electrical)
// cruiseEff = cruise propulsive efficiency (2 front motors)
//
// propData keys must match prop config IDs.

CFG.motors.push({
  id:           "emax-eco2-2807",
  name:         "Emax ECO II 2807",
  kv:           1300,
  cells:        [3, 4],
  defaultCells: 4,
  propData: {
    "3": {
      "gf7042":  { thrust: 880,  hoverEff: 0.53, cruiseEff: 0.63 },
      "hq7x55":  { thrust: 1040, hoverEff: 0.46, cruiseEff: 0.57 },
      "hq7x4x3": { thrust: 980,  hoverEff: 0.45, cruiseEff: 0.58 }
    },
    "4": {
      "gf7042":  { thrust: 1350, hoverEff: 0.55, cruiseEff: 0.65 },
      "hq7x55":  { thrust: 1600, hoverEff: 0.49, cruiseEff: 0.59 },
      "hq7x4x3": { thrust: 1500, hoverEff: 0.48, cruiseEff: 0.60 }
    }
  }
});
