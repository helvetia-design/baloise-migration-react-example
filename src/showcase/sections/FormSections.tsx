import {
  BalCheckbox,
  BalDate,
  BalDropdown,
  BalFileUpload,
  BalHint,
  BalHintText,
  BalHintTitle,
  BalInput,
  BalInputSlider,
  BalInputStepper,
  BalLabel,
  BalNumberInput,
  BalOption,
  BalRadio,
  BalSegment,
  BalSegmentItem,
  BalSelect,
  BalSelectOption,
  BalTextarea,
} from '@baloise/ds-react'

import { ShowcaseSection } from '../../components/ShowcaseSection'
import { VariantRow } from '../../components/VariantRow'

export function FormSections() {
  return (
    <>
      <ShowcaseSection
        tag="bal-input"
        title="Input"
        omitted="autocomplete, autocorrect und inputmode — Durchreich-Props ohne visuelle Wirkung, real verbaut auf /application."
      >
        <VariantRow label="default">
          <BalInput name="sc-input" />
        </VariantRow>
        <VariantRow label="mask=claim-number">
          <BalInput name="sc-input-mask" mask="claim-number" />
        </VariantRow>
        <VariantRow label="textAlign=right">
          <BalInput name="sc-input-align" textAlign="right" value="4051" />
        </VariantRow>
        <VariantRow label="type=password">
          <BalInput name="sc-input-type" type="password" value="geheim" />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-number-input"
        title="Number Input"
        omitted="keine Enum-Props — gezeigt werden Boolean-Zustände."
      >
        <VariantRow label="default">
          <BalNumberInput name="sc-number" />
        </VariantRow>
        <VariantRow label="disabled">
          <BalNumberInput name="sc-number-disabled" value={42} disabled />
        </VariantRow>
        <VariantRow label="invalid">
          <BalNumberInput name="sc-number-invalid" value={0} invalid />
        </VariantRow>
        <VariantRow label="readonly">
          <BalNumberInput name="sc-number-readonly" value={12} readonly />
        </VariantRow>
        <VariantRow label="onlyPositive">
          <BalNumberInput name="sc-number-positive" value={7} onlyPositive />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-textarea"
        title="Textarea"
        omitted="autocomplete, inputmode und wrap — Durchreich-Props ohne visuelle Wirkung, real verbaut auf /claim."
      >
        <VariantRow label="default">
          <BalTextarea name="sc-textarea" />
        </VariantRow>
        <VariantRow label="disabled">
          <BalTextarea name="sc-textarea-disabled" value="gesperrt" disabled />
        </VariantRow>
        <VariantRow label="invalid">
          <BalTextarea name="sc-textarea-invalid" value="zu kurz" invalid />
        </VariantRow>
        <VariantRow label="readonly">
          <BalTextarea name="sc-textarea-readonly" value="nur lesen" readonly />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-select"
        title="Select"
        omitted="autocomplete — Durchreich-Prop ohne visuelle Wirkung, real verbaut auf /application."
      >
        <VariantRow label="default mit bal-select-option">
          <BalSelect name="sc-select">
            <BalSelectOption value="hausrat" label="Hausrat">Hausrat</BalSelectOption>
            <BalSelectOption value="haftpflicht" label="Privathaftpflicht">
              Privathaftpflicht
            </BalSelectOption>
          </BalSelect>
        </VariantRow>
        <VariantRow label="filter=starts-with">
          <BalSelect name="sc-select-filter" filter="starts-with">
            <BalSelectOption value="hausrat" label="Hausrat">Hausrat</BalSelectOption>
            <BalSelectOption value="motorfahrzeug" label="Motorfahrzeug">
              Motorfahrzeug
            </BalSelectOption>
          </BalSelect>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-dropdown"
        title="Dropdown"
        omitted="autocomplete — Durchreich-Prop ohne visuelle Wirkung."
      >
        <VariantRow label="default mit bal-option">
          <BalDropdown name="sc-dropdown">
            <BalOption value="police" label="Police">Police</BalOption>
            <BalOption value="rechnung" label="Rechnung">Rechnung</BalOption>
          </BalDropdown>
        </VariantRow>
        <VariantRow label="filter=starts-with">
          <BalDropdown name="sc-dropdown-filter" filter="starts-with">
            <BalOption value="police" label="Police">Police</BalOption>
          </BalDropdown>
        </VariantRow>
        <VariantRow label="size=small">
          <BalDropdown name="sc-dropdown-size" size="small">
            <BalOption value="police" label="Police">Police</BalOption>
          </BalDropdown>
        </VariantRow>
        <VariantRow label="theme=purple">
          <BalDropdown name="sc-dropdown-theme" theme="purple">
            <BalOption value="police" label="Police">Police</BalOption>
          </BalDropdown>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-date"
        title="Date"
        omitted="autocomplete — Durchreich-Prop ohne visuelle Wirkung, real verbaut auf /application."
      >
        <VariantRow label="default">
          <BalDate name="sc-date" />
        </VariantRow>
        <VariantRow label="disabled">
          <BalDate name="sc-date-disabled" value="2026-01-01" disabled />
        </VariantRow>
        <VariantRow label="invalid">
          <BalDate name="sc-date-invalid" value="2026-02-31" invalid allowInvalidValue />
        </VariantRow>
        <VariantRow label="readonly">
          <BalDate name="sc-date-readonly" value="2026-01-01" readonly />
        </VariantRow>
        <VariantRow label="triggerIcon">
          <BalDate name="sc-date-trigger" triggerIcon />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-checkbox" title="Checkbox">
        <VariantRow label="default">
          <BalCheckbox name="sc-checkbox">Zustimmen</BalCheckbox>
        </VariantRow>
        <VariantRow label="color=green">
          <BalCheckbox name="sc-checkbox-color" color="green" checked>
            Grün
          </BalCheckbox>
        </VariantRow>
        <VariantRow label="interface=switch">
          <BalCheckbox name="sc-checkbox-switch" interface="switch" checked>
            Schalter
          </BalCheckbox>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-radio" title="Radio">
        <VariantRow label="default">
          <BalRadio name="sc-radio" value="a">
            Variante A
          </BalRadio>
        </VariantRow>
        <VariantRow label="color=yellow">
          <BalRadio name="sc-radio-color" value="b" color="yellow">
            Gelb
          </BalRadio>
        </VariantRow>
        <VariantRow label="interface=button">
          <BalRadio name="sc-radio-button" value="c" interface="button">
            Als Button
          </BalRadio>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-segment"
        title="Segment"
        omitted="keine Enum-Props — gezeigt werden Boolean-Zustände."
      >
        <VariantRow label="default mit bal-segment-item">
          <BalSegment value="a">
            <BalSegmentItem value="a" label="Kompakt" />
            <BalSegmentItem value="b" label="Ausführlich" />
          </BalSegment>
        </VariantRow>
        <VariantRow label="expanded">
          <BalSegment value="a" expanded>
            <BalSegmentItem value="a" label="Breit" />
            <BalSegmentItem value="b" label="Zweite" />
          </BalSegment>
        </VariantRow>
        <VariantRow label="vertical">
          <BalSegment value="a" vertical>
            <BalSegmentItem value="a" label="Oben" />
            <BalSegmentItem value="b" label="Unten" />
          </BalSegment>
        </VariantRow>
        <VariantRow label="disabled">
          <BalSegment value="a" disabled>
            <BalSegmentItem value="a" label="Gesperrt" />
          </BalSegment>
        </VariantRow>
        <VariantRow label="invalid">
          <BalSegment value="a" invalid>
            <BalSegmentItem value="a" label="Fehlerhaft" />
          </BalSegment>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-file-upload"
        title="File Upload"
        omitted="keine Enum-Props — gezeigt werden Boolean-Zustände."
      >
        <VariantRow label="default">
          <BalFileUpload name="sc-upload" />
        </VariantRow>
        <VariantRow label="multiple und hasFileList">
          <BalFileUpload name="sc-upload-multiple" multiple hasFileList />
        </VariantRow>
        <VariantRow label="disabled">
          <BalFileUpload name="sc-upload-disabled" disabled />
        </VariantRow>
        <VariantRow label="invalid">
          <BalFileUpload name="sc-upload-invalid" invalid />
        </VariantRow>
        <VariantRow label="loading">
          <BalFileUpload name="sc-upload-loading" loading />
        </VariantRow>
        <VariantRow label="readonly">
          <BalFileUpload name="sc-upload-readonly" readonly />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-input-slider"
        title="Input Slider"
        omitted="keine Enum-Props — gezeigt werden Boolean-Zustände."
      >
        <VariantRow label="default">
          <BalInputSlider name="sc-slider" />
        </VariantRow>
        <VariantRow label="hasTicks">
          <BalInputSlider name="sc-slider-ticks" min={0} max={100} step={25} value={50} hasTicks />
        </VariantRow>
        <VariantRow label="disabled">
          <BalInputSlider name="sc-slider-disabled" value={30} disabled />
        </VariantRow>
        <VariantRow label="invalid">
          <BalInputSlider name="sc-slider-invalid" value={10} invalid />
        </VariantRow>
        <VariantRow label="readonly">
          <BalInputSlider name="sc-slider-readonly" value={70} readonly />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-input-stepper"
        title="Input Stepper"
        omitted="keine Enum-Props — gezeigt werden Boolean-Zustände."
      >
        <VariantRow label="default">
          <BalInputStepper name="sc-stepper" />
        </VariantRow>
        <VariantRow label="disabled">
          <BalInputStepper name="sc-stepper-disabled" value={3} disabled />
        </VariantRow>
        <VariantRow label="invalid">
          <BalInputStepper name="sc-stepper-invalid" value={0} invalid />
        </VariantRow>
        <VariantRow label="readonly">
          <BalInputStepper name="sc-stepper-readonly" value={5} readonly />
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection tag="bal-label" title="Label">
        <VariantRow label="default">
          <BalLabel>Beschriftung</BalLabel>
        </VariantRow>
        <VariantRow label="size=large">
          <BalLabel size="large">Gross</BalLabel>
        </VariantRow>
        <VariantRow label="weight=regular">
          <BalLabel weight="regular">Normal</BalLabel>
        </VariantRow>
      </ShowcaseSection>

      <ShowcaseSection
        tag="bal-hint"
        title="Hint"
        omitted="keine Enum-Props — gezeigt wird der Boolean-Zustand small."
      >
        <VariantRow label="default mit bal-hint-title und bal-hint-text">
          <BalHint>
            <BalHintTitle>Wozu diese Angabe?</BalHintTitle>
            <BalHintText>Die Summe bestimmt die Prämie.</BalHintText>
          </BalHint>
        </VariantRow>
        <VariantRow label="small">
          <BalHint small>
            <BalHintTitle>Kurzer Hinweis</BalHintTitle>
            <BalHintText>Ohne Schliessen-Schaltfläche auf Tablet und Desktop.</BalHintText>
          </BalHint>
        </VariantRow>
      </ShowcaseSection>
    </>
  )
}
