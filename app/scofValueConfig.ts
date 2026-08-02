export const scofValueConfig = {
  current: {
    kes: 165,
    status: "Current issuer-set price",
  },
  checkpoint: {
    kes: 545,
    dateIso: "2029-10-29",
    dateLabel: "29 October 2029",
    status: "Strategic checkpoint",
  },
  horizon: {
    eur: 45,
    status: "Long-horizon aspiration",
  },
  fxReference: {
    eurKes: 148.12,
    source: "Central Bank of Kenya",
    sourceUrl: "https://www.centralbank.go.ke/",
    status: "Illustrative reference conversion",
  },
} as const;

const round = (value: number, decimals = 2) => Number(value.toFixed(decimals));

export const scofValueDerived = {
  currentEur: round(scofValueConfig.current.kes / scofValueConfig.fxReference.eurKes),
  checkpointEur: round(scofValueConfig.checkpoint.kes / scofValueConfig.fxReference.eurKes),
  checkpointGapKes: scofValueConfig.checkpoint.kes - scofValueConfig.current.kes,
  checkpointMultiple: round(scofValueConfig.checkpoint.kes / scofValueConfig.current.kes),
  checkpointUpliftPercent: round(((scofValueConfig.checkpoint.kes - scofValueConfig.current.kes) / scofValueConfig.current.kes) * 100, 1),
  horizonKes: Math.round(scofValueConfig.horizon.eur * scofValueConfig.fxReference.eurKes),
  horizonFromCheckpointMultiple: round((scofValueConfig.horizon.eur * scofValueConfig.fxReference.eurKes) / scofValueConfig.checkpoint.kes),
  horizonFromCurrentMultiple: round((scofValueConfig.horizon.eur * scofValueConfig.fxReference.eurKes) / scofValueConfig.current.kes),
} as const;

export const formatKes = (value: number) => `KSh ${Math.round(value).toLocaleString("en-US")}`;
export const formatEur = (value: number) => `€${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
