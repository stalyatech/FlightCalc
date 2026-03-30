// BrotherHobby Avenger 2812 V5 910KV Motor Configuration
// -------------------------------------------------------
// Motor weight: ~68g | Stator: 28×12mm | Shaft: 5mm (M5)
// Rated voltage: 4–6S | Mounting: 16×19mm
//
// Recommended for Flightory Moose with 9–10 inch props.
//
// 6S thrust estimates (from Moose manual + community data):
//   10×4.5  ~2800g @~42A (per motor, full throttle)
//
// 4S thrust: voltage-power scaled from 6S (×0.60).
//
// hoverEff  = overall hover efficiency (not primary use — fixed-wing motor)
// cruiseEff = cruise propulsive efficiency (twin tractor)
//
// propData keys must match prop config IDs.

CFG.motors.push({
  id:           "brotherhobby-2812",
  name:         "BrotherHobby Avenger 2812 V5",
  kv:           910,
  cells:        [4, 6],
  defaultCells: 6,
  propData: {
    "4": {
      "1045":  { thrust: 1700, hoverEff: 0.50, cruiseEff: 0.62 }
    },
    "6": {
      "1045":  { thrust: 2800, hoverEff: 0.52, cruiseEff: 0.68 }
    }
  }
});
