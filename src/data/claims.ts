export type ClaimStatus = 'offen' | 'bearbeitung' | 'erledigt' | 'abgelehnt'

export interface Claim {
  id: string
  policyId: string
  title: string
  kind: string
  status: ClaimStatus
  reportedDate: string
  amountChf: number
  handler: string
}

/** Ein Schaden referenziert immer eine bestehende Police. */
export const claims: Claim[] = [
  {
    id: 'S-2026-0093',
    policyId: 'P-8842-11',
    title: 'Wasserschaden Küche',
    kind: 'Wasser',
    status: 'bearbeitung',
    reportedDate: '14.09.2026',
    amountChf: 3_400,
    handler: 'M. Keller',
  },
  {
    id: 'S-2026-0061',
    policyId: 'P-7731-62',
    title: 'Parkschaden Heckstossstange',
    kind: 'Kollision',
    status: 'offen',
    reportedDate: '02.08.2026',
    amountChf: 1_150,
    handler: 'S. Furrer',
  },
  {
    id: 'S-2025-0488',
    policyId: 'P-9150-04',
    title: 'Beschädigtes Mietvelo',
    kind: 'Haftpflicht',
    status: 'erledigt',
    reportedDate: '21.11.2025',
    amountChf: 620,
    handler: 'M. Keller',
  },
  {
    id: 'S-2025-0330',
    policyId: 'P-8842-11',
    title: 'Glasbruch Balkontür',
    kind: 'Glas',
    status: 'abgelehnt',
    reportedDate: '08.07.2025',
    amountChf: 0,
    handler: 'S. Furrer',
  },
]

export const claimStatusLabels: Record<ClaimStatus, string> = {
  offen: 'Offen',
  bearbeitung: 'In Bearbeitung',
  erledigt: 'Erledigt',
  abgelehnt: 'Abgelehnt',
}

export const claimKinds = [
  { value: 'wasser', label: 'Wasser' },
  { value: 'feuer', label: 'Feuer' },
  { value: 'einbruch', label: 'Einbruch / Diebstahl' },
  { value: 'glas', label: 'Glasbruch' },
  { value: 'kollision', label: 'Kollision' },
]
