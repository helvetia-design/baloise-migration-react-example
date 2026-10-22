export type ApplicationStatus = 'entwurf' | 'eingereicht' | 'pruefung' | 'policiert'

export interface Application {
  id: string
  product: string
  status: ApplicationStatus
  completedSteps: number
  totalSteps: number
  createdDate: string
  premiumChf: number
}

/** Ein Antrag durchläuft die Strecke und wird nach Annahme zur Police. */
export const applications: Application[] = [
  {
    id: 'A-2026-0417',
    product: 'Hausrat Plus',
    status: 'pruefung',
    completedSteps: 3,
    totalSteps: 4,
    createdDate: '28.09.2026',
    premiumChf: 468,
  },
  {
    id: 'A-2026-0392',
    product: 'Privathaftpflicht Familie',
    status: 'entwurf',
    completedSteps: 1,
    totalSteps: 4,
    createdDate: '12.09.2026',
    premiumChf: 204,
  },
]

export interface ApplicationStep {
  value: string
  label: string
  hintTitle: string
  hintText: string
}

export const applicationSteps: ApplicationStep[] = [
  {
    value: 'person',
    label: 'Person',
    hintTitle: 'Wozu diese Angaben?',
    hintText:
      'Name und Geburtsdatum bestimmen den Tarif und werden für die Policierung benötigt.',
  },
  {
    value: 'coverage',
    label: 'Deckung',
    hintTitle: 'Versicherungssumme',
    hintText:
      'Die Summe sollte dem Neuwert Ihres Hausrats entsprechen. Als Richtwert gelten CHF 1000 pro Quadratmeter.',
  },
  {
    value: 'payment',
    label: 'Zahlung',
    hintTitle: 'Zahlungsweise',
    hintText: 'Bei jährlicher Zahlung entfällt der Ratenzuschlag von 3 Prozent.',
  },
  {
    value: 'review',
    label: 'Prüfen',
    hintTitle: 'Letzter Schritt',
    hintText: 'Prüfen Sie die Angaben; nach dem Einreichen ist eine Änderung nur schriftlich möglich.',
  },
]

export const deductibleOptions = [
  { value: '200', label: 'CHF 200' },
  { value: '500', label: 'CHF 500' },
  { value: '1000', label: 'CHF 1000' },
]

export const paymentIntervals = [
  { value: 'jaehrlich', label: 'Jährlich' },
  { value: 'halbjaehrlich', label: 'Halbjährlich' },
  { value: 'quartal', label: 'Vierteljährlich' },
]

export const additionalCovers = [
  { value: 'velo', label: 'Velo-Kaskoschutz' },
  { value: 'reise', label: 'Reisegepäck' },
  { value: 'elektronik', label: 'Elektronik-Zusatz' },
]

export const applicationFaq = [
  {
    value: 'kuendigung',
    question: 'Wann kann ich den Vertrag kündigen?',
    answer:
      'Ordentlich auf das Ende der Vertragsdauer unter Einhaltung einer Frist von drei Monaten. Nach einem Schadenfall besteht ein ausserordentliches Kündigungsrecht.',
  },
  {
    value: 'geltungsbereich',
    question: 'Wo gilt die Deckung?',
    answer:
      'Der Hausrat ist am Wohnort in der Schweiz versichert, auswärts im Rahmen der Aussenversicherung weltweit bis 90 Tage.',
  },
  {
    value: 'selbstbehalt',
    question: 'Wie wirkt sich der Selbstbehalt aus?',
    answer:
      'Der gewählte Selbstbehalt wird pro Schadenfall abgezogen. Ein höherer Selbstbehalt senkt die Jahresprämie.',
  },
]
