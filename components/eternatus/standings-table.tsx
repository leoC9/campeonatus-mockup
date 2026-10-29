import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { podium, PositionChip } from "./podium"

type StandingsPlayer = {
  position: number
  /** Nickname do jogador. */
  name: string
  /** "4–0–0". */
  record: string
  points: number
  /** "61,1%". */
  owr: string
  /** "54,2%". */
  oowr?: string
  /** "R$ 42,00". Só no standings final. */
  credit?: string
  dropped?: boolean
}

// Tabela pública do standings no desktop (a StandingsRow é a versão de
// celular). Top 3 com medalha e linha tingida; o resto só com o número.
// `credit` só no standings final; na tabela ao vivo nunca passe a coluna.
function StandingsTable({
  players,
  showCredit = false,
  caption,
  className,
}: {
  players: StandingsPlayer[]
  /** Mostra a coluna Crédito. Só no standings final. */
  showCredit?: boolean
  caption?: string
  className?: string
}) {
  const hasOowr = players.some((p) => p.oowr != null)

  return (
    <div
      data-slot="standings-table"
      className={cn("overflow-hidden rounded-lg border border-line bg-card", className)}
    >
      <Table className="[&_td]:px-3 [&_th]:px-3 [&_td:last-child]:pr-3 [&_th:last-child]:pr-3">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <TableHeader>
          <TableRow className="bg-cream">
            <TableHead className="w-14">#</TableHead>
            <TableHead>Jogador</TableHead>
            <TableHead className="text-right">V–E–D</TableHead>
            <TableHead className="text-right">Pts</TableHead>
            <TableHead className="text-right">OWR</TableHead>
            {hasOowr ? <TableHead className="text-right">OOWR</TableHead> : null}
            {showCredit ? <TableHead className="text-right">Crédito</TableHead> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((p) => {
            const place = podium(p.position)
            return (
              <TableRow
                key={`${p.position}-${p.name}`}
                className={cn(
                  "border-l-[3px] border-l-transparent",
                  place && [place.row, place.rail],
                  "last:[&_td]:border-b-0"
                )}
              >
                <TableCell>
                  <PositionChip position={p.position} />
                </TableCell>
                <TableCell className="whitespace-normal">
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "truncate",
                        place ? "font-semibold text-ink" : "text-ink",
                        p.dropped && "font-normal text-ink-muted"
                      )}
                    >
                      {p.name}
                    </span>
                    {p.dropped ? <Badge tone="neutral">Drop</Badge> : null}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums text-ink-muted">{p.record}</TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{p.points}</TableCell>
                <TableCell className="text-right tabular-nums">{p.owr}</TableCell>
                {hasOowr ? (
                  <TableCell className="text-right tabular-nums">{p.oowr ?? "—"}</TableCell>
                ) : null}
                {showCredit ? (
                  <TableCell className="text-right tabular-nums">{p.credit ?? "—"}</TableCell>
                ) : null}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export { StandingsTable, type StandingsPlayer }
