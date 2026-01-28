import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, FileText, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";

interface PromptInputProps {
  onAnalyze: (prompt: string) => void;
  isLoading: boolean;
}

const examplePrompt = `Voglio creare una web app per gestire le spese personali. 
L'utente deve poter inserire spese con categoria, importo e data. 
Deve esserci un dashboard con grafici che mostrano le spese per categoria. 
Vorrei anche un sistema di budget mensili con alert quando si supera il limite.`;

const loadingMessages = [
  "Analizzando la struttura del prompt...",
  "Valutando la chiarezza degli obiettivi...",
  "Identificando i requisiti funzionali...",
  "Verificando i vincoli tecnici...",
  "Suggerendo lo stack tecnologico...",
  "Generando architettura consigliata...",
  "Valutando scalabilità e sicurezza...",
  "Creando best practices personalizzate...",
  "Ottimizzando il prompt finale...",
  "Completando l'analisi SWOT...",
];

export function PromptInput({ onAnalyze, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      setMessageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && user) {
      onAnalyze(prompt);
    }
  };
  
  const handleUseExample = () => {
    setPrompt(examplePrompt);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card-elevated p-6 glow-effect">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Il tuo prompt
            </label>
            <button
              type="button"
              onClick={handleUseExample}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Usa esempio →
            </button>
          </div>
          
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descrivi la web app che vuoi realizzare... Includi obiettivi, funzionalità, target utenti e qualsiasi vincolo tecnico."
            className="min-h-[200px] text-base bg-background/50 border-border/50 focus:border-primary/50 mb-4"
            variant="glass"
          />
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {prompt.length} / 5000 caratteri
            </p>
            
            {!authLoading && !user ? (
              <Link to="/auth">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="min-w-[180px] gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Accedi per analizzare
                </Button>
              </Link>
            ) : (
              <Button
                type="submit"
                variant="glow"
                size="lg"
                disabled={!prompt.trim() || isLoading || !user}
                className="min-w-[180px]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 min-w-[200px]">
                    <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={messageIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-left"
                      >
                        {loadingMessages[messageIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Analizza Prompt
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}
