import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function DialogInfo() {
  <Dialog>
    <DialogTrigger asChild>
      <button className="text-white font-bold bg-purple px-10 py-4 rounded-md hover:bg-purple/90 transition-colors cursor-pointer">
        ir para pagamento
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Página de pagamento</DialogTitle>
        <DialogDescription>
          Página de pagamento será adicionada em breve
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
}