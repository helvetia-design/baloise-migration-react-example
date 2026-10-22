import { BalPagination, BalTable, BalTag, BalText } from '@baloise/ds-react'

import { DOCUMENTS_PER_PAGE, documents } from '../../data/profile'

interface Props {
  page: number
  category: string
  onPageChange: (page: number) => void
}

const tagColor = (category: string) =>
  category === 'Police' ? 'green' : category === 'Rechnung' ? 'yellow' : 'grey'

/*
  Struktur aus der Doku, Components/Data Display/Table: das Styling sitzt auf dem
  nativen <table> selbst über die Klassen table/is-striped/is-hoverable (core.css)
  und w-full/p-none (utilities/all.css) — bal-table ist nur der äussere Wrapper für
  das expanded-Prop und liefert selbst kein Tabellen-CSS.
*/
export function DocumentTable({ page, category, onPageChange }: Props) {
  const filtered =
    category === 'alle' ? documents : documents.filter(doc => doc.category === category)
  const totalPages = Math.max(1, Math.ceil(filtered.length / DOCUMENTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const visible = filtered.slice((safePage - 1) * DOCUMENTS_PER_PAGE, safePage * DOCUMENTS_PER_PAGE)

  return (
    <>
      <BalTable expanded>
        <table className="table is-striped is-hoverable w-full">
          <thead>
            <tr>
              <th>Dokument</th>
              <th>Kategorie</th>
              <th>Datum</th>
              <th>Grösse</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(doc => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>
                  <BalTag color={tagColor(doc.category)} size="small">
                    {doc.category}
                  </BalTag>
                </td>
                <td>{doc.date}</td>
                <td>{doc.sizeKb} KB</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={4}>Keine Dokumente in dieser Kategorie.</td>
              </tr>
            )}
          </tbody>
        </table>
      </BalTable>

      <BalPagination
        className="mt-small"
        value={safePage}
        totalPages={totalPages}
        align="end"
        pageRange={1}
        disabled={totalPages === 1}
        onBalChange={event => onPageChange(Number(event.detail ?? 1))}
      />

      <BalText size="small" color="grey" space="top">
        Seite {safePage} von {totalPages} · {filtered.length} Dokumente
      </BalText>
    </>
  )
}
