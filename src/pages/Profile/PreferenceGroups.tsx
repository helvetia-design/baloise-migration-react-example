import {
  BalCheckbox,
  BalCheckboxGroup,
  BalDivider,
  BalLabel,
  BalRadio,
  BalRadioGroup,
  BalText,
} from '@baloise/ds-react'

import { contactChannels, newsletterTopics } from '../../data/profile'

interface Props {
  channel: string
  topics: string[]
  onChannelChange: (channel: string) => void
  onTopicsChange: (topics: string[]) => void
}

export function PreferenceGroups({ channel, topics, onChannelChange, onTopicsChange }: Props) {
  return (
    <>
      <section className="mb-medium">
        <BalLabel size="small" weight="bold" className="mb-x-small">
          Bevorzugter Kanal
        </BalLabel>
        <BalRadioGroup
          name="channel"
          value={channel}
          columns={3}
          columnsMobile={1}
          onBalChange={event => onChannelChange(String(event.detail ?? 'post'))}
        >
          {contactChannels.map(option => (
            <BalRadio
              key={option.value}
              value={option.value}
              color={option.value === channel ? 'green' : 'purple'}
            >
              {option.label}
            </BalRadio>
          ))}
        </BalRadioGroup>
      </section>

      <BalDivider borderStyle="dashed" color="grey" space="x-small" />

      <section className="mt-medium">
        <BalLabel size="small" weight="bold" className="mb-x-small">
          Newsletter
        </BalLabel>
        <BalCheckboxGroup
          name="topics"
          value={topics}
          interface="switch"
          vertical
          onBalChange={event => onTopicsChange((event.detail ?? []) as string[])}
        >
          {newsletterTopics.map(topic => (
            <BalCheckbox key={topic.value} value={topic.value}>
              {topic.label}
            </BalCheckbox>
          ))}
        </BalCheckboxGroup>
        <BalText size="small" color="grey" space="top">
          {topics.length === 0
            ? 'Kein Newsletter abonniert.'
            : `${topics.length} von ${newsletterTopics.length} Themen abonniert.`}
        </BalText>
      </section>
    </>
  )
}
