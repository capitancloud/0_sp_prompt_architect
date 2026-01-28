import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface OptimizedPromptProps {
  originalPrompt: string;
  optimizedPrompt: string;
}

export function OptimizedPrompt({ originalPrompt, optimizedPrompt }: OptimizedPromptProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const handleCopy = async () => {
    try {
      // Get plain text from markdown for cleaner clipboard content
      await navigator.clipboard.writeText(optimizedPrompt);
      setCopied(true);
      toast({
        title: "Copiato!",
        description: "Il prompt ottimizzato è stato copiato negli appunti.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile copiare il testo. Riprova.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card-elevated p-6 gradient-border"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold gradient-text">Prompt Ottimizzato</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Versione migliorata e strutturata del tuo prompt
          </p>
        </div>
        
        <Button
          variant={copied ? "default" : "glow"}
          size="sm"
          onClick={handleCopy}
          className="gap-2 min-w-[100px]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copiato!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copia
            </>
          )}
        </Button>
      </div>
      
      <div className="p-5 rounded-lg bg-card border border-border">
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-xl font-bold text-primary mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-semibold text-foreground mt-6 mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-medium text-foreground mt-4 mb-2">{children}</h3>,
              p: ({ children }) => <p className="text-muted-foreground mb-3">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3">{children}</ul>,
              li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
              strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
            }}
          >
            {optimizedPrompt}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
