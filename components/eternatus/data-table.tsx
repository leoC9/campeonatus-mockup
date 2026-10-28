import * as React from "react"
import { cn } from "cn"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type DataTableColumn<Row> = {
  key: string
  label: string
  align?: "left" | "right"
  /** Algarismos tabulares (datas, contagens, placar). */
  numeric?: boolean
  render?: (row: Row) => React.ReactNode
}

// Tabela densa do backoffice e da tabela pública no desktop.
// Situação em <Badge>; ação da linha em <Button variant="link"> na última
// coluna, alinhada à direita.
function DataTable<Row extends { id?: string | number }>({
  columns,
  rows,
  className,
}: {
  columns: DataTableColumn<Row>[]
  rows: Row[]
  className?: string
}) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((c) => (
            <TableHead
              key={c.key}
              className={cn(c.align === "right" && "text-right")}
            >
              {c.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={row.id ?? i}>
            {columns.map((c) => (
              <TableCell
                key={c.key}
                className={cn(
                  c.align === "right" && "text-right",
                  c.numeric && "tabular-nums"
                )}
              >
                {c.render
                  ? c.render(row)
                  : (row[c.key as keyof Row] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { DataTable, type DataTableColumn }
