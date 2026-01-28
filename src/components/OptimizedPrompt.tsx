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
