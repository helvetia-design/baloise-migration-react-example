export type PolicyStatus = 'aktiv' | 'ruhend' | 'gekuendigt'
export type ProductKey = 'hausrat' | 'haftpflicht' | 'motorfahrzeug'

export interface Policy {
  id: string
  product: ProductKey
  productLabel: string
  label: string
  status: PolicyStatus
  icon: string
  premiumChf: number
  paidChf: number
  coverageChf: number
  startDate: string
  renewalDate: string
  holder: string
}

/** Bestehende Verträge. Aus einem policierten Antrag entsteht je eine Police. */
export const policies: Policy[] = [
  {
    id: 'P-8842-11',
    product: 'hausrat',
    productLabel: 'Hausrat',
    label: 'Hausrat Basel-Stadt',
    status: 'aktiv',
    icon: 'home',
    premiumChf: 412,
    paidChf: 412,
    coverageChf: 120_000,
    startDate: '01.01.2024',
    renewalDate: '01.01.2027',
    holder: 'Andrea Brunner',
  },
  {
    id: 'P-9150-04',
    product: 'haftpflicht',
    productLabel: 'Privathaftpflicht',
    label: 'Privathaftpflicht Familie',
    status: 'aktiv',
    icon: 'account',
    premiumChf: 186,
    paidChf: 93,
    coverageChf: 5_000_000,
    startDate: '01.04.2023',
    renewalDate: '01.04.2027',
    holder: 'Andrea Brunner',
  },
  {
    id: 'P-7731-62',
    product: 'motorfahrzeug',
    productLabel: 'Motorfahrzeug',
    label: 'Motorfahrzeug BS 214 887',
    status: 'ruhend',
    icon: 'dashboard',
    premiumChf: 1_248,
    paidChf: 624,
    coverageChf: 45_000,
    startDate: '15.06.2022',
    renewalDate: '15.06.2027',
    holder: 'Andrea Brunner',
  },
]

export const policyStatusLabels: Record<PolicyStatus, string> = {
  aktiv: 'Aktiv',
  ruhend: 'Ruhend',
  gekuendigt: 'Gekündigt',
}

export const findPolicy = (id: string): Policy | undefined =>
  policies.find(policy => policy.id === id)

export const formatChf = (amount: number): string =>
  `CHF ${amount.toLocaleString('de-CH')}`
