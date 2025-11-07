import fundo1 from "@/assets/images/fundo-life1.png";
import fundo2 from "@/assets/images/fundo-life2.png";
import logo from "@/assets/images/logo-life.png";
import logoOneVoice from "@/assets/images/logo-one-voice.png";
import { RefreshCcw, ScreenShareIcon, Settings, StepForward } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./App.css";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [sorteadas, setSorteadas] = useState<number[]>([]);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(20);

  const [minInput, setMinInput] = useState(`${min}`);
  const [maxInput, setMaxInput] = useState(`${max}`);

  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            alert(`Erro ao ativar tela cheia: ${err.message}`);
          });
        } else {
          document.exitFullscreen();
        }
      }

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 -z-1 opacity-80">
        <img src={fundo1} className="absolute w-80 md:w-150 top-0 left-0 saturate-150" />
        <img
          src={fundo2}
          className="absolute w-40 md:w-120 bottom-0 right-0 saturate-150"
        />
        <img
          src={logo}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-100 px-20 py-5"
        />
      </div>
      <div className="absolute right-10 top-0">
        <Button variant='ghost' onClick={toggleFullscreen}>
          <ScreenShareIcon/>
        </Button>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="absolute right-0 top-0">
            <Settings />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="min">Mínimo:</Label>
            <Input
              type="number"
              id="min"
              min={1}
              value={minInput}
              onChange={(ev) => {
                setMinInput(ev.target.value);
              }}
            />
            <Label htmlFor="max">Máximo:</Label>
            <Input
              type="number"
              id="max"
              min={1}
              value={maxInput}
              onChange={(ev) => {
                setMaxInput(ev.target.value);
              }}
            />
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  const toasterErrorOptions = {
                    unstyled: true,
                    classNames: {
                      toast:
                        "bg-red-400 rounded-sm flex gap-2 items-center px-2 py-3",
                      title: "text-white",
                      icon: "text-white",
                    },
                  };
                  if (!minInput)
                    return toast.error(
                      "É necessário definir o limite mínimo!",
                      toasterErrorOptions
                    );
                  if (!maxInput)
                    return toast.error(
                      "É necessário definir o limite máximo!",
                      toasterErrorOptions
                    );
                  setMin(Number(minInput));
                  setMax(Number(maxInput));
                  setSorteadas([]);
                  toast.success("Atualização efetuada com sucesso!", {
                    unstyled: true,
                    classNames: {
                      toast:
                        "bg-green-500 rounded-sm flex gap-2 items-center px-2 py-3",
                      title: "text-white",
                      icon: "text-white",
                    },
                  });
                  setDialogOpen(false);
                }}
              >
                <RefreshCcw />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-5">
        <Card className="w-lg">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <img src={logoOneVoice} alt="" className="w-40 saturate-200 brightness-75" />
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-5">
              <div className="flex flex-col gap-5 basis-2/3">
                <div className="text-9xl">
                  {sorteadas[sorteadas.length - 1] ?? "*"}
                </div>
                <span>
                  {min} - {max}
                </span>
                <div>
                  <Button
                    className="bg-green-500"
                    onClick={() => {
                      if (max - min + 2 <= sorteadas.length) return;
                      let n;
                      do {
                        n = Math.floor(Math.random() * (max - min + 1)) + min;
                      } while (sorteadas.includes(n));
                      setSorteadas((prev) => prev.concat(n));
                    }}
                    disabled={max - min + 1 <= sorteadas.length}
                  >
                    <StepForward />
                  </Button>
                </div>
              </div>
              <div className="w-1 h-auto bg-black"></div>
              <div className={`grid grid-cols-4 ${sorteadas.length < 16 && 'grid-rows-4'} gap-3`}>
                {[...sorteadas]
                  .sort((a, b) => a - b)
                  .map((n) => (
                    <Badge
                      variant="outline"
                      className="border-fuchsia-500 text-fuchsia-700 w-full"
                      key={`sorteada-${n}`}
                    >
                      {n}
                    </Badge>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  );
}

export default App;
