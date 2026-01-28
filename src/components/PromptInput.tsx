import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  onAnalyze: (prompt: string) => void;
  isLoading: boolean;
}

const examplePrompt = `Voglio creare una web app per gestire le spese personali. 
L'utente deve poter inserire spese con categoria, importo e data. 
Deve esserci un dashboard con grafici che mostrano le spese per categoria. 
Vorrei anche un sistema di budget mensili con alert quando si supera il limite.`;

export function PromptInput({ onAnalyze, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
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
            
            <Button
              type="submit"
              variant="glow"
              size="lg"
              disabled={!prompt.trim() || isLoading}
              className="min-w-[180px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analizzando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Analizza Prompt
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
