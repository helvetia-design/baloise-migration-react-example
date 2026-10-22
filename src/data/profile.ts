export interface ProfileDocument {
  id: string
  name: string
  category: string
  date: string
  sizeKb: number
}

export const person = {
  firstName: 'Andrea',
  lastName: 'Brunner',
  customerNumber: 'K-4471-08',
  birthDate: '04.03.1986',
  street: 'Aeschenvorstadt 12',
  zip: '4051',
  city: 'Basel',
  email: 'andrea.brunner@example.ch',
  phone: '+41 61 555 20 14',
  iban: 'CH93 0076 2011 6238 5295 7',
  advisor: 'Martin Keller',
}

export const documents: ProfileDocument[] = [
  { id: 'D-1001', name: 'Police Hausrat 2026', category: 'Police', date: '02.01.2026', sizeKb: 184 },
  { id: 'D-1002', name: 'Prämienrechnung Q1', category: 'Rechnung', date: '08.01.2026', sizeKb: 96 },
  { id: 'D-1003', name: 'Schadenbestätigung S-2026-0093', category: 'Schaden', date: '15.09.2026', sizeKb: 212 },
  { id: 'D-1004', name: 'Police Privathaftpflicht 2026', category: 'Police', date: '02.01.2026', sizeKb: 176 },
  { id: 'D-1005', name: 'Prämienrechnung Q2', category: 'Rechnung', date: '04.04.2026', sizeKb: 98 },
  { id: 'D-1006', name: 'Fahrzeugausweis Kopie', category: 'Nachweis', date: '19.06.2025', sizeKb: 430 },
  { id: 'D-1007', name: 'Kündigungsbestätigung Zusatz', category: 'Police', date: '30.11.2025', sizeKb: 72 },
  { id: 'D-1008', name: 'Prämienrechnung Q3', category: 'Rechnung', date: '03.07.2026', sizeKb: 101 },
  { id: 'D-1009', name: 'Schadenabrechnung S-2025-0488', category: 'Schaden', date: '12.12.2025', sizeKb: 158 },
]

export const DOCUMENTS_PER_PAGE = 4

export const contactChannels = [
  { value: 'post', label: 'Post' },
  { value: 'email', label: 'E-Mail' },
  { value: 'app', label: 'App-Mitteilung' },
]

export const newsletterTopics = [
  { value: 'praevention', label: 'Prävention' },
  { value: 'produkte', label: 'Neue Produkte' },
  { value: 'vorsorge', label: 'Vorsorge' },
]

export const profileTabs = [
  { value: 'stammdaten', label: 'Stammdaten', icon: 'account' },
  { value: 'kontakt', label: 'Kontakt', icon: 'message' },
  { value: 'dokumente', label: 'Dokumente', icon: 'document' },
]
