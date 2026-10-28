import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DataTable,
  EventCard,
  Hero,
  ProgressCard,
  SectionHeading,
  Segmented,
  Sidebar,
  SiteHeader,
  StandingsRow,
  TextField,
} from "@/components/eternatus"

type Championship = {
  id: number
  name: string
  date: string
  format: string
  players: number
  status: string
  tone: "info" | "outline" | "neutral"
  action: string
}

const championships: Championship[] = [
  { id: 24, name: "Liguinha Eternatus #24", date: "18/09", format: "Suíço 4 · Bo3", players: 18, status: "Rodada 3 de 4", tone: "info", action: "Abrir" },
  { id: 8, name: "Gym Leader Challenge #08", date: "20/09", format: "Suíço 3 · Bo1", players: 14, status: "Inscrições", tone: "outline", action: "Abrir" },
  { id: 23, name: "Liguinha Eternatus #23", date: "11/09", format: "Suíço 4 · Bo3", players: 22, status: "Finalizado", tone: "neutral", action: "Standings" },
]

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-paper">
      <SiteHeader>
        <Button variant="link">Eventos</Button>
        <Button variant="link">Standings</Button>
      </SiteHeader>

      <Hero
        eyebrow="Liga Eternatus · Pokémon TCG"
        title="O circuito da casa começa toda quinta-feira."
        lede="Liguinha semanal, ranking e crédito da loja. Inscrição no balcão ou pelo link do evento."
      >
        <Button variant="hero">Ver próximos eventos</Button>
        <Button variant="hero-ghost">Standings</Button>
      </Hero>

      <main className="mx-auto flex w-full max-w-[1120px] flex-col gap-12 bg-cream px-6 py-12">
        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Ações"
            title="Botões"
            description="Outline em todas as telas. Verbo no infinitivo, sem ícone decorativo."
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button>Confirmar inscrição</Button>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="link">Inscrever-se</Button>
            <Button size="sm">+ Novo campeonato</Button>
            <Button disabled>Indisponível</Button>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Status"
            title="Badges"
            description="Sempre em par fundo/texto e sempre com palavra."
          />
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="info">Inscrições abertas</Badge>
            <Badge tone="danger">Últimas vagas</Badge>
            <Badge tone="neutral">Em breve</Badge>
            <Badge tone="warn">Late reg · R2</Badge>
            <Badge tone="outline">Inscrições</Badge>
            <Badge tone="info">Rodada 3 de 4</Badge>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Formulários"
            title="Inscrição por link"
            description="Sem senha e sem conta. Três campos e você entra na lista do lojista."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <TextField label="Nome" placeholder="Seu nome completo" />
              <TextField label="Nickname na liga" defaultValue="rafa.nog" />
              <TextField
                label="POPID"
                defaultValue="4128907"
                inputMode="numeric"
                hint="Usado para o seu histórico na liga."
              />
              <Button block>Confirmar inscrição</Button>
            </div>
            <div className="flex flex-col items-start gap-4">
              <Segmented
                label="Situação"
                options={["Em andamento", "Agendados", "Finalizados"]}
              />
              <Segmented
                label="Partida"
                options={["Melhor de 1", "Melhor de 3"]}
                defaultValue="Melhor de 3"
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading eyebrow="Vitrine" title="Próximos eventos" />
          <div className="grid gap-4 md:grid-cols-3">
            <EventCard
              when="Quinta · 19h30"
              status="Abertas"
              statusTone="info"
              title="Liguinha Eternatus #24"
              meta="Standard · Suíço 4 · Bo3"
            >
              <span>R$ 25,00 · 18/24</span>
              <Button variant="link">Inscrever-se</Button>
            </EventCard>
            <EventCard
              when="Sábado · 14h"
              status="Últimas vagas"
              statusTone="danger"
              title="Gym Leader Challenge #08"
              meta="GLC · Suíço 3 · Bo1"
            >
              <span>R$ 20,00 · 14/16</span>
              <Button variant="link">Inscrever-se</Button>
            </EventCard>
            <EventCard
              when="Quinta, 02/10 · 19h30"
              status="Em breve"
              statusTone="neutral"
              title="Liguinha Eternatus #26"
              meta="Standard · Suíço 4 · Bo3"
            >
              <span>R$ 25,00</span>
              <Button variant="link">Avise-me</Button>
            </EventCard>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading eyebrow="Público" title="Standings" />
          <div className="flex max-w-[360px] flex-col gap-2">
            <StandingsRow position={1} name="rafa.nog" owr="61,1%" points={12} record="4–0–0" highlight />
            <StandingsRow position={2} name="nanda.tcg" owr="58,3%" points={9} record="3–1–0" />
            <StandingsRow position={3} name="lipe.pkm" owr="55,0%" points={9} record="3–1–0" />
          </div>
        </section>
      </main>

      <section className="mx-auto mb-12 flex w-full max-w-[1120px] overflow-hidden rounded-xl shadow-panel">
        <Sidebar
          items={["Campeonatos", "Jogadores", "Eventos do site"]}
          active="Campeonatos"
          footer="Loja Eternatus · lojista"
        />
        <div className="flex flex-1 flex-col gap-6 bg-cream p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="m-0 type-h2">Campeonatos</h2>
            <Button size="sm">+ Novo campeonato</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ProgressCard
              label="Progresso da rodada"
              value={6}
              total={9}
              caption="de 9 mesas reportadas"
            />
            <div className="flex flex-col gap-2 rounded-lg border border-line bg-card p-4">
              <p className="m-0 type-eyebrow text-ink-muted">Falta reportar</p>
              <div className="flex flex-wrap gap-2">
                <Badge tone="danger">Mesa 3</Badge>
                <Badge tone="danger">Mesa 7</Badge>
                <Badge tone="danger">Mesa 8</Badge>
              </div>
            </div>
          </div>
          <DataTable<Championship>
            rows={championships}
            columns={[
              { key: "name", label: "Campeonato" },
              { key: "date", label: "Data", numeric: true },
              { key: "format", label: "Formato" },
              { key: "players", label: "Jogadores", numeric: true },
              {
                key: "status",
                label: "Situação",
                render: (r) => <Badge tone={r.tone}>{r.status}</Badge>,
              },
              {
                key: "action",
                label: "",
                align: "right",
                render: (r) => <Button variant="link">{r.action}</Button>,
              },
            ]}
          />
        </div>
      </section>
    </div>
  )
}
