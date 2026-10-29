// Tudo que o bundle expõe em `window.Eternatus`. Componente novo entra aqui
// e em ds/components/<Nome>/ (README.md + preview.html).
export * from "@/components/eternatus"

/** Aviso em linha nos tons info, warn, danger e neutral; título, texto e ação opcional. */
export { Alert } from "@/components/ui/alert"
/** Confirmação destrutiva: confirmar em outline `danger-ink`, cancelar em `secondary`. */
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
export { Badge } from "@/components/ui/badge"
export { Button } from "@/components/ui/button"
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
/** Caixa de 20px marcada em `navy-800`, área de toque de 44px; label e descrição opcionais. */
export { Checkbox } from "@/components/ui/checkbox"
/** Janela modal: conteúdo `card` com radius-xl e shadow-panel, título h3, ações à direita. */
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export { Input } from "@/components/ui/input"
export { Label } from "@/components/ui/label"
export { Progress } from "@/components/ui/progress"
/** Liga/desliga com trilho `neutral-soft`, ligado em `navy-800`; label e descrição opcionais. */
export { Switch } from "@/components/ui/switch"
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
/** Abas encostadas no desenho do Segmented; aba ativa em `info-soft`/`info-ink`. */
export { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
/** Texto longo no desenho do Input, altura mínima de 96px. */
export { Textarea } from "@/components/ui/textarea"
export { Toggle } from "@/components/ui/toggle"
export { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
/** Dica curta em `navy-800` com texto `on-navy`, caption 12. */
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
