import { useState } from "react";
import { Header } from "@/components/Header";
import { PromptInput } from "@/components/PromptInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import { AnalysisResult } from "@/types/analysis";
import { analyzePrompt } from "@/services/analysisService";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analyzedPrompt, setAnalyzedPrompt] = useState<string>("");
  const [isSynced, setIsSynced] = useState(true);
  const [syncCorrections, setSyncCorrections] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAnalyze = async (prompt: string) => {
    setIsLoading(true);
    setAnalyzedPrompt(prompt);
    
    try {
      const { result, isSynced: synced, corrections } = await analyzePrompt(prompt);
      setAnalysisResult(result);
      setIsSynced(synced);
      setSyncCorrections(corrections);
      
      if (!synced && corrections.length > 0) {
        console.info("Architecture was automatically synced with tech stack:", corrections);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Errore nell'analisi",
        description: error instanceof Error ? error.message : "Si è verificato un errore. Riprova.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setAnalyzedPrompt("");
    setIsSynced(true);
    setSyncCorrections([]);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-primary/3 to-transparent" />
      </div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="pb-16">
          <AnimatePresence mode="wait">
            {!analysisResult ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PromptInput onAnalyze={handleAnalyze} isLoading={isLoading} />
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back button */}
                <div className="max-w-6xl mx-auto px-4 mb-6">
                  <button
                    onClick={handleReset}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    ← Nuova analisi
                  </button>
                </div>
                
                <AnalysisResults result={analysisResult} originalPrompt={analyzedPrompt} isSynced={isSynced} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-border/50 py-6">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Prompt Engineering Analyzer • Costruito con ❤️ per sviluppatori
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
