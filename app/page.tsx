import { InboxIcon } from "lucide-react"

import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ConfirmDialog,
  CopyLinkField,
  DataTable,
  EmptyState,
  EventCard,
  FileUpload,
  Hero,
  NumberField,
  PageHeader,
  ProgressCard,
  SectionHeading,
  Segmented,
  Sidebar,
  SiteHeader,
  StandingsRow,
  StandingsTable,
  Stepper,
  StickyActionBar,
  TextField,
} from "@/components/eternatus"

import { RoundTimerDemo } from "./round-timer-demo"

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
              <TextField
                label="E-mail"
                defaultValue="rafa.nog@"
                error="Informe um e-mail válido."
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
          <SectionHeading
            eyebrow="Público"
            title="Standings"
            description="Top 3 com troféu e medalhas. Tabela no desktop, uma linha por jogador no celular."
          />
          <StandingsTable
            className="hidden md:block"
            caption="Standings final da Liguinha #24"
            showCredit
            players={[
              { position: 1, name: "rafa.nog", record: "4–0–0", points: 12, owr: "61,1%", oowr: "55,8%", credit: "R$ 60,00" },
              { position: 2, name: "nanda.tcg", record: "3–1–0", points: 9, owr: "58,3%", oowr: "54,2%", credit: "R$ 42,00" },
              { position: 3, name: "lipe.pkm", record: "3–1–0", points: 9, owr: "55,0%", oowr: "51,7%", credit: "R$ 30,00" },
              { position: 4, name: "pedro.hbk", record: "3–1–0", points: 9, owr: "52,4%", oowr: "50,1%", credit: "R$ 18,00" },
              { position: 5, name: "bia.charizard", record: "2–2–0", points: 6, owr: "49,0%", oowr: "48,3%" },
              { position: 17, name: "joao.dropou", record: "1–1–0", points: 3, owr: "40,2%", oowr: "44,9%", dropped: true },
            ]}
          />
          <div className="flex max-w-[360px] flex-col gap-2 md:hidden">
            <StandingsRow position={1} name="rafa.nog" owr="61,1%" points={12} record="4–0–0" highlight />
            <StandingsRow position={2} name="nanda.tcg" owr="58,3%" points={9} record="3–1–0" />
            <StandingsRow position={3} name="lipe.pkm" owr="55,0%" points={9} record="3–1–0" />
            <StandingsRow position={4} name="pedro.hbk" owr="52,4%" points={9} record="3–1–0" me />
            <StandingsRow position={17} name="joao.dropou" owr="40,2%" points={3} record="1–1–0" dropped />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Formulários"
            title="Campos do evento"
            description="Número, texto longo, upload e link de inscrição. Tudo que o lojista preenche ao criar um campeonato."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <NumberField label="Vagas" defaultValue={24} min={4} max={64} step={2} hint="Até 64 jogadores." />
              <NumberField label="Rodadas" defaultValue={4} min={3} max={6} hint="Sugerido: 4 para 18 jogadores." />
              <NumberField label="Mesas" defaultValue={0} min={0} max={40} error="Informe pelo menos 1 mesa." />
              <div className="flex flex-col gap-2">
                <Label htmlFor="obs">Observações do evento</Label>
                <Textarea
                  id="obs"
                  aria-describedby="obs-hint"
                  placeholder="Deck registrado até 19h15. Mesas numeradas pela ordem de chegada."
                />
                <span id="obs-hint" className="type-small text-ink-muted">
                  Aparece na página pública do evento.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <FileUpload label="Imagem do evento" />
              <FileUpload label="Logo da loja" error="Arquivo com 3,4 MB. O limite é 2 MB." />
              <CopyLinkField url="https://eternacamp.app/e/liguinha-24/inscricao?src=balcao" active />
              <CopyLinkField url="https://eternacamp.app/e/glc-08/inscricao" active={false} label="Link do GLC #08" />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Formulários"
            title="Seleção"
            description="Checkbox, switch e toggle. Sempre com rótulo em palavra."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Checkbox
                defaultChecked
                label="Aceito pagar a inscrição no balcão"
                description="R$ 25,00 até 19h15 do dia do evento."
              />
              <Checkbox label="Quero receber o link do standings" />
              <Checkbox label="Pré-release" disabled />
              <div className="flex gap-4 py-3">
                <Checkbox aria-label="Selecionar todos" checked="indeterminate" />
                <Checkbox aria-label="Mesa 4" defaultChecked />
                <Checkbox aria-label="Mesa 5" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Switch
                defaultChecked
                label="Inscrições pelo link"
                description="O link do evento aceita novos jogadores."
              />
              <Switch label="Late reg até a rodada 2" />
              <Switch label="Standings público" disabled defaultChecked />
              <div className="flex flex-wrap gap-2 pt-2">
                <Toggle variant="outline" aria-label="Mostrar só pendentes">
                  Só pendentes
                </Toggle>
                <Toggle variant="outline" defaultPressed aria-label="Mostrar drops">
                  Mostrar drops
                </Toggle>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Status"
            title="Alertas"
            description="Confirmação, atenção, pendência que trava e nota sem urgência."
          />
          <div className="flex max-w-[520px] flex-col gap-3">
            <Alert tone="info" title="Inscrição confirmada">
              Você é o 19º inscrito da Liguinha #24. Chegue até 19h15 para o pagamento no balcão.
            </Alert>
            <Alert tone="warn" title="Late reg até a rodada 2">
              Quem entrar agora começa com uma derrota na tabela.
            </Alert>
            <Alert
              tone="danger"
              title="Falta reportar 3 mesas"
              action={<Button variant="link">Ver mesas</Button>}
            >
              A rodada 4 só pareia depois dos resultados.
            </Alert>
            <Alert tone="neutral" title="Inscrições pelo link fechadas">
              Ainda dá para inscrever no balcão até 19h15.
            </Alert>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Navegação"
            title="Cabeçalho, abas e passos"
            description="PageHeader do campeonato, Tabs entre seções e Stepper do check-in."
          />
          <PageHeader
            eyebrow="Campeonatos"
            title="Liguinha Eternatus #24"
            status="Rodada 3 de 4"
            meta={["Quinta, 18/09 · 19h30", "Standard", "Suíço 4 · Bo3", "18 jogadores"]}
          >
            <Button variant="secondary">Standings</Button>
            <Button>Reportar rodada</Button>
          </PageHeader>
          <Tabs defaultValue="rodadas">
            <TabsList aria-label="Seções do campeonato">
              <TabsTrigger value="rodadas">Rodadas</TabsTrigger>
              <TabsTrigger value="standings">Standings</TabsTrigger>
              <TabsTrigger value="jogadores">Jogadores</TabsTrigger>
            </TabsList>
            <TabsContent value="rodadas">
              <ProgressCard label="Progresso da rodada" value={6} total={9} caption="de 9 mesas reportadas" />
            </TabsContent>
            <TabsContent value="standings">
              <StandingsRow position={1} name="rafa.nog" owr="61,1%" points={12} record="4–0–0" highlight />
            </TabsContent>
            <TabsContent value="jogadores">
              <p className="m-0 text-ink-muted">18 jogadores inscritos · 2 pelo balcão</p>
            </TabsContent>
          </Tabs>
          <div className="flex flex-col gap-6">
            <Stepper steps={["Presença", "Recomendação", "Início"]} current={1} />
            <Stepper
              steps={["Inscrições", "Rodadas", "Standings", "Crédito"]}
              current={3}
              label="Fases do campeonato"
            />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Rodada"
            title="Relógio e desempates"
            description="RoundTimer controlado pelo lojista; Ajustar abre o Dialog com o tempo exato. Tooltip explica OWR e OOWR no standings."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <RoundTimerDemo seconds={1930} running />
            <RoundTimerDemo seconds={0} />
          </div>
          <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 type-small text-ink-muted">
            Desempates, na ordem:
            <Tooltip>
              <TooltipTrigger className="type-ui text-ink underline decoration-dotted underline-offset-4">
                OWR
              </TooltipTrigger>
              <TooltipContent>Taxa de vitória dos oponentes. Primeiro desempate.</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="type-ui text-ink underline decoration-dotted underline-offset-4">
                OOWR
              </TooltipTrigger>
              <TooltipContent>Taxa de vitória dos oponentes dos oponentes. Segundo desempate.</TooltipContent>
            </Tooltip>
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Sobreposição"
            title="Diálogos"
            description="Dialog para formulário em janela. ConfirmDialog para tudo que não volta: sempre a pergunta, a consequência e o verbo no botão."
          />
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Editar inscrição</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar inscrição</DialogTitle>
                  <DialogDescription>
                    A alteração vale só para a Liguinha #24. O histórico do jogador não muda.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <TextField label="Nickname na liga" defaultValue="rafa.nog" />
                  <TextField label="POPID" defaultValue="4128907" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Cancelar</Button>
                  </DialogClose>
                  <Button>Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <ConfirmDialog
              trigger={<Button variant="link">Drop</Button>}
              action="dropar rafa.nog da Liguinha #24"
              consequence="O jogador sai dos pareamentos a partir da próxima rodada. Os pontos até aqui ficam no standings."
              confirmLabel="Dropar jogador"
            />
            <ConfirmDialog
              trigger={<Button variant="secondary">Encerrar rodada</Button>}
              action="encerrar a rodada 3"
              consequence="As 3 mesas sem resultado contam como empate e a rodada 4 pareia agora. Não dá para reabrir a rodada."
              confirmLabel="Encerrar rodada"
            />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Vazio"
            title="Estado vazio e barra fixa"
            description="EmptyState quando não há campeonato. StickyActionBar prende o CTA no rodapé do celular."
          />
          <EmptyState
            icon={<InboxIcon />}
            title="Nenhum campeonato por aqui"
            description="Crie o primeiro para abrir as inscrições pelo link ou pelo balcão."
          >
            <Button>Criar campeonato</Button>
          </EmptyState>
          <div className="flex flex-col gap-3">
            <p className="m-0 max-w-[520px] type-small text-ink-muted">
              A StickyActionBar é de celular: fica presa no rodapé da tela, acima da área segura do aparelho, e o formulário fica atrás dela. Abaixo, uma tela de 360px de largura para ver isso no desktop.
            </p>
            <div className="flex w-full max-w-[360px] flex-col overflow-hidden rounded-xl border border-line bg-cream shadow-panel">
              <div className="flex flex-col gap-4 px-4 py-5">
                <h3 className="m-0 type-h3">Inscrição · Liguinha #24</h3>
                <p className="m-0 type-small text-ink-muted tabular-nums">R$ 25,00 no balcão · 18 de 24 vagas</p>
                <TextField label="Nome" placeholder="Seu nome completo" />
                <TextField label="Nickname na liga" defaultValue="rafa.nog" />
                <TextField label="POPID" defaultValue="4128907" inputMode="numeric" />
              </div>
              <StickyActionBar
                className="static md:border-t md:border-line md:bg-cream md:px-4 md:pt-3 md:pb-3"
              >
                <Button block>Confirmar inscrição</Button>
              </StickyActionBar>
            </div>
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
