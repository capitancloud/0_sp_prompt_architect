import { motion } from "framer-motion";
import { Copy, Check, ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface OptimizedPromptProps {
  originalPrompt: string;
  optimizedPrompt: string;
}

export function OptimizedPrompt({ originalPrompt, optimizedPrompt }: OptimizedPromptProps) {
  const [copied, setCopied] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(optimizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            className="gap-2"
          >
            <ArrowLeftRight className="w-4 h-4" />
            {showComparison ? "Nascondi" : "Confronta"}
          </Button>
          
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
      </div>
      
      {showComparison ? (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <h3 className="text-sm font-medium text-destructive mb-3">Prompt Originale</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {originalPrompt}
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-success/5 border border-success/20">
            <h3 className="text-sm font-medium text-success mb-3">Prompt Ottimizzato</h3>
            <div className="text-sm text-foreground prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{optimizedPrompt}</ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </motion.div>
  );
}
