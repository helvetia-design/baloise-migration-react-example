import { useRef, useState, type ComponentRef } from 'react'
import { useSearchParams } from 'react-router'
import {
  BalCard,
  BalCardContent,
  BalCardTitle,
  BalData,
  BalDataItem,
  BalDataLabel,
  BalDataValue,
  BalDivider,
  BalDropdown,
  BalHeading,
  BalOption,
  BalSegment,
  BalSegmentItem,
  BalTabItem,
  BalTabs,
  BalText,
} from '@baloise/ds-react'

import { DocumentTable } from './DocumentTable'
import { PreferenceGroups } from './PreferenceGroups'
import { documents, person, profileTabs } from '../../data/profile'

const categories = ['alle', ...new Set(documents.map(doc => doc.category))]

export function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [channel, setChannel] = useState('email')
  const [topics, setTopics] = useState<string[]>(['praevention'])
  const tabsRef = useRef<ComponentRef<typeof BalTabs>>(null)

  const tab = searchParams.get('tab') ?? profileTabs[0].value
  const page = Number(searchParams.get('page') ?? '1')
  const view = searchParams.get('view') ?? 'kompakt'
  const category = searchParams.get('category') ?? 'alle'

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    next.set(key, value)
    if (key === 'category' || key === 'tab') {
      next.set('page', '1')
    }
    setSearchParams(next, { replace: true })
  }

  /** Imperativer Aufruf auf bal-tabs. */
  const jumpToDocuments = async () => {
    const option = await tabsRef.current?.getOptionByValue('dokumente')
    if (option) {
      await tabsRef.current?.select(option)
    }
    setParam('tab', 'dokumente')
  }

  const masterData = [
    { label: 'Kundennummer', value: person.customerNumber },
    { label: 'Geburtsdatum', value: person.birthDate },
    { label: 'Adresse', value: `${person.street}, ${person.zip} ${person.city}` },
    { label: 'Beratung', value: person.advisor },
  ]

  return (
    <div className="container is-detail-page py-large">
      <header className="mb-large">
        <BalHeading level="h1" space="none">
          {person.firstName} {person.lastName}
        </BalHeading>
        <BalText color="grey" space="none">
          Kundennummer {person.customerNumber}
        </BalText>
      </header>

      <BalTabs
        ref={tabsRef}
        value={tab}
        context="navigation"
        iconPosition="horizontal"
        float="left"
        border
        onBalChange={event => setParam('tab', String(event.detail ?? profileTabs[0].value))}
      >
        {profileTabs.map(entry => (
          <BalTabItem
            key={entry.value}
            value={entry.value}
            label={entry.label}
            icon={entry.icon}
            bubble={entry.value === 'dokumente' ? String(documents.length) : false}
          />
        ))}
      </BalTabs>

      <BalDivider color="grey-light" space="x-small" />

      {tab === 'stammdaten' && (
        <BalCard className="mb-large">
          <BalCardTitle>Stammdaten</BalCardTitle>
          <BalCardContent>
            <BalData horizontal={view === 'kompakt'} border>
              {masterData.map(entry => (
                <BalDataItem key={entry.label}>
                  <BalDataLabel>{entry.label}</BalDataLabel>
                  <BalDataValue>{entry.value}</BalDataValue>
                </BalDataItem>
              ))}
            </BalData>

            <BalSegment
              value={view}
              expanded
              onBalChange={event => setParam('view', String(event.detail ?? 'kompakt'))}
            >
              <BalSegmentItem value="kompakt" label="Kompakt" />
              <BalSegmentItem value="ausfuehrlich" label="Ausführlich" />
            </BalSegment>
          </BalCardContent>
        </BalCard>
      )}

      {tab === 'kontakt' && (
        <BalCard className="mb-large">
          <BalCardTitle>Kontakt und Mitteilungen</BalCardTitle>
          <BalCardContent>
            <BalText size="small" space="bottom">
              {person.email} · {person.phone}
            </BalText>
            <PreferenceGroups
              channel={channel}
              topics={topics}
              onChannelChange={setChannel}
              onTopicsChange={setTopics}
            />
          </BalCardContent>
        </BalCard>
      )}

      {tab === 'dokumente' && (
        <BalCard className="mb-large">
          <BalCardTitle>Dokumente</BalCardTitle>
          <BalCardContent>
            <>
              <BalDropdown
                className="mb-small"
                name="category"
                value={category}
                autocomplete="off"
                size="small"
                theme="purple"
                filter="starts-with"
                clearable={false}
                placeholder="Kategorie wählen"
                onBalChange={event => setParam('category', String(event.detail ?? 'alle'))}
              >
                {categories.map(entry => (
                  <BalOption key={entry} value={entry} label={entry === 'alle' ? 'Alle' : entry}>
                    {entry === 'alle' ? 'Alle' : entry}
                  </BalOption>
                ))}
              </BalDropdown>

              <DocumentTable
                page={Number.isNaN(page) ? 1 : page}
                category={category}
                onPageChange={next => setParam('page', String(next))}
              />
            </>
          </BalCardContent>
        </BalCard>
      )}

      {tab !== 'dokumente' && (
        <BalText size="small" space="none">
          <a href="#dokumente" onClick={jumpToDocuments}>
            Direkt zu den Dokumenten
          </a>
        </BalText>
      )}
    </div>
  )
}
