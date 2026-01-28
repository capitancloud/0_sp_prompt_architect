import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface OptimizedPromptProps {
  originalPrompt: string;
  optimizedPrompt: string;
}

export function OptimizedPrompt({ originalPrompt, optimizedPrompt }: OptimizedPromptProps) {
  const { toast } = useToast();
  
  const handleDownload = () => {
    try {
      const blob = new Blob([optimizedPrompt], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "prompt-ottimizzato.md";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download completato!",
        description: "Il file prompt-ottimizzato.md è stato scaricato.",
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Errore",
        description: "Impossibile scaricare il file. Riprova.",
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
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h2 className="text-xl font-bold gradient-text">Prompt Ottimizzato</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Versione migliorata e strutturata del tuo prompt
          </p>
        </div>
        
        <Button
          variant="glow"
          size="sm"
          onClick={handleDownload}
          className="gap-2 relative z-20"
        >
          <Download className="w-4 h-4" />
          Scarica .md
        </Button>
      </div>
      
      <div className="p-6 rounded-xl bg-card/50 border border-border/50 relative z-10">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-primary mb-6 pb-3 border-b border-primary/20">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-medium text-primary/90 mt-5 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-3 mb-5 ml-1">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-3 text-[15px] leading-relaxed">
                  <span className="mt-2 w-2 h-2 rounded-full bg-primary/60 flex-shrink-0" />
                  <span className="text-muted-foreground">{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="text-foreground font-semibold">
                  {children}
                </strong>
              ),
            }}
          >
            {optimizedPrompt}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
