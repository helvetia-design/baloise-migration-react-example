You are building an internal reference application for the Baloise Design System, the
component library this project consumes. Its purpose is to exercise the library broadly,
so the team has one place where every component and its variants can be seen and clicked.

Work only inside this folder. Do not read, list or traverse any directory above it — the
sibling folders are unrelated projects. Your sources of truth are the installed package
types under `node_modules/@baloise/ds-core/dist/types` **and the public documentation at
https://design.baloise.dev — in that order of priority reversed: the documented example is
authoritative, the types are only a prop-shape reference.** Use no other UI library; every
piece of UI comes from the Baloise Design System.

## Build method (new)

The type definitions tell you which props exist and what type they are. They do **not**
tell you how a component is meant to be composed, which children it silently requires, or
which of its props only make sense alongside something else. This library's components are
permissive at the type level (`svg: string`, `color: SomeEnum | string`, props typed `any`)
and fail **silently** when misused: wrong-but-type-valid usage renders blank, misaligned, or
invisible — no console error, no type error, build stays green.

Before writing a component's first usage, fetch and read its actual documented example at
design.baloise.dev (or its Storybook iframe under `?viewMode=docs&id=…`). Do not infer
structure, required children, or prop combinations from the type signature alone. Concretely,
check for:

- **Required children, not just attributes.** Some components read their visible content
  from children/innerHTML, not from a same-named prop (`bal-select-option label="X"` renders
  nothing unless it also has `X` as a text child — the `label` attribute only feeds
  `data-label`/ARIA). Match the documented example's children exactly, even when it looks
  redundant with an attribute of the same name.
- **Props that only work with an external wrapper.** Some components adjust their own
  styling for a context they expect the app to supply, rather than providing that context
  themselves (`bal-list background="dark"` switches text to white but does not paint a
  background — the dark surface must come from a surrounding element). If the documented
  example wraps the component in something, replicate that wrapper.
- **Attribute-vs-property traps.** A handful of components couple to each other through a
  literal HTML attribute read via `closest('[attr]')` or `querySelector`, not through the
  typed React prop of the same name (which only sets the JS property and never reflects to
  the DOM). If clicking/toggling does nothing despite props looking correct, check whether
  the real DOM attribute is actually present.
- **Components with near-zero own CSS.** A few components (e.g. a table wrapper) only
  provide structural/behavioral plumbing and expect the actual visual styling to live on a
  native element inside them via utility classes shown in the documented example. Don't
  assume a component is visually self-sufficient just because it renders without error.

If a component's documented example doesn't match what seems like the obvious reading of its
type, defer to the documented example.

## Stack

Vite, React 19, TypeScript, react-router. Dependencies `@baloise/ds-react@^19` and
`@baloise/ds-styles@^19` (`@baloise/ds-core` comes along transitively). Wire the styles the
documented way, with these five imports in the app entry:

    import '@baloise/ds-styles/css/normalize.css'
    import '@baloise/ds-styles/css/font.css'
    import '@baloise/ds-styles/css/structure.css'
    import '@baloise/ds-styles/css/core.css'
    import '@baloise/ds-styles/css/utilities/all.css'

**Known packaging quirk (new):** some files in `@baloise/ds-core` load auxiliary chunks via
`import(/* @vite-ignore */ './something.js')` (seen so far: logo/spinner animation, a
floating-ui loader used by popover-family components, a touch/swipe helper). The comment
stops Vite from bundling them, which 404s at runtime for any feature that needs that chunk
(animated logo/spinner, anything positioned via popover, touch gestures). Don't special-case
individual filenames — write a small Vite plugin that strips `/* @vite-ignore */` from any
file under `@baloise/ds-core/components/` that contains it, so newly-discovered cases don't
require a second fix.

## Structure

Shell: `bal-app` wrapping everything, with `bal-navbar` and `bal-footer`, and `bal-logo` in
the brand slot. Match the documented shell shape: `bal-app` carries the `has-sticky-footer`
class, navigation sits in a native `<header>`, routed content sits in a native `<main>`.

Route `/showcase`: one section per component, each showing that component's enum props with
their distinct values side by side. This is the page someone opens to see what the library
offers.

Four pages of a fictional insurance portal, built from the same components but composed
naturally:

- `/` dashboard — cards, badges, tags, lists, progress bars, data items
- `/application` multi-step application form — steps, form controls, labels, hints,
  validation messages, accordion
- `/claim` claim report — file upload, date picker, textarea, confirmation modal, toast on
  submit
- `/profile` — tabs, segments, checkbox and radio groups, pagination, table, dropdown

**Step and tab content (new):** where a step/tab component exposes an active/inactive
visual state controlled by its own item elements (e.g. a steps or tabs component whose items
toggle visibility internally), put the real step/tab content as children of those item
elements, matching the documented pattern, rather than rendering the active content
separately from application state and using the items as content-less labels. The two can
look identical on screen; only the first one is the component as documented.

## Components to cover

Every component below appears at least once, together with its child elements where the
library has them (for example `bal-card-title`, `bal-list-item`, `bal-navbar-brand`,
**and — treat this list as a floor, not just a sample — anything else the documentation
shows as a standard composition of a listed component, such as an accordion-style list item
or an icon variant of a radio/checkbox**):

bal-accordion, bal-app, bal-badge, bal-button, bal-card, bal-carousel, bal-checkbox,
bal-close, bal-content, bal-data, bal-date, bal-divider, bal-dropdown, bal-file-upload,
bal-footer, bal-form-grid, bal-heading, bal-hint, bal-icon, bal-input, bal-input-slider,
bal-input-stepper, bal-label, bal-list, bal-logo, bal-modal, bal-navbar, bal-notification,
bal-number-input, bal-pagination, bal-popover, bal-popup, bal-progress-bar, bal-radio,
bal-segment, bal-select, bal-shape, bal-sheet, bal-snackbar, bal-spinner, bal-stack,
bal-steps, bal-table, bal-tabs, bal-tag, bal-text, bal-textarea, bal-toast, bal-tooltip

Toast and snackbar have no markup element of their own — use their documented controller API.

## Coverage per component

1. one default usage with no props
2. every enum prop at least once with a non-default value (colors, sizes, positions)
3. one composition or nesting case
4. at least one prop whose value comes from state or an expression, not a string literal
5. where the component has them, one event handler and one imperative method or controller
   call **— and verify this the same way as point 2: build a list of every component that
   exposes at least one `onBal*` event and every component that exposes at least one
   instance method (from the type definitions), then check off each one against actual
   usage in the code before calling coverage complete. A claim of "done" here needs the same
   evidence as the enum-prop table, not a visual spot-check.**

Point 2 belongs on /showcase. Points 3 to 5 belong on the portal pages, spread over several
files, inside .map() lists and conditional rendering — not collected into one file.

## Constraints

- No backend, no authentication, no data fetching. Static mock data in plain modules.
- No randomness, no time-dependent values: every page renders identically on every load.
- Every view reachable directly by URL, with no state that must be clicked into existence.
- `tsc --noEmit` and the production build pass; the app runs with no console errors or
  warnings.
- **Passing `tsc` and a clean console are necessary but not sufficient (new).** This
  library fails silently on structural misuse — before calling a component's coverage done,
  look at its actual rendered output (screenshot or direct inspection), not just the absence
  of errors.
- Do not commit anything.
