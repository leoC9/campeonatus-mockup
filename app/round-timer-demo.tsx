"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NumberField, RoundTimer } from "@/components/eternatus"

// Demo da home: o RoundTimer é controlado, então o relógio vive aqui.
// "Ajustar" abre o Dialog com o tempo exato, como a tela do backoffice faz.
export function RoundTimerDemo({
  seconds: initial,
  running: initialRunning = false,
}: {
  seconds: number
  running?: boolean
}) {
  const [seconds, setSeconds] = useState(initial)
  const [started, setRunning] = useState(initialRunning)
  const [adjusting, setAdjusting] = useState(false)
  const [minutes, setMinutes] = useState(Math.ceil(initial / 60))
  const running = started && seconds > 0 && !adjusting

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((v) => (v > 0 ? v - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [running])

  function openAdjust() {
    setMinutes(Math.ceil(seconds / 60))
    setAdjusting(true)
  }

  return (
    <>
      <RoundTimer
        durationSeconds={seconds}
        running={running}
        onStart={() => setRunning(true)}
        onPause={() => setRunning(false)}
        onChange={setSeconds}
        onAdjust={openAdjust}
      />
      <Dialog open={adjusting} onOpenChange={setAdjusting}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Ajustar o tempo da rodada</DialogTitle>
            <DialogDescription>
              O relógio continua pausado até você iniciar de novo.
            </DialogDescription>
          </DialogHeader>
          <NumberField
            label="Minutos"
            value={minutes}
            min={0}
            max={90}
            onChange={setMinutes}
            hint="Rodada padrão: 30 min de jogo mais 3 turnos."
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button
              onClick={() => {
                setSeconds(minutes * 60)
                setAdjusting(false)
              }}
            >
              Salvar tempo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
