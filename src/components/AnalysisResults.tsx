import { motion } from "framer-motion";
import { AnalysisResult } from "@/types/analysis";
import { ScoreRing } from "./ScoreRing";
import { DimensionCard } from "./DimensionCard";
import { StrengthsWeaknesses } from "./StrengthsWeaknesses";
import { OptimizedPrompt } from "./OptimizedPrompt";
import { TechStackSection } from "./TechStackSection";
import { ArchitectureDiagramFromStack } from "./ArchitectureDiagramFromStack";
import { SimplifiedArchitectureFromStack } from "./SimplifiedArchitectureFromStack";
import { ImplementationRoadmapFromStack } from "./ImplementationRoadmapFromStack";
import { BestPracticesSection } from "./BestPracticesSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Sparkles, Layers, Code2, BookOpen, Rocket } from "lucide-react";

interface AnalysisResultsProps {
  result: AnalysisResult;
  originalPrompt: string;
  isSynced?: boolean;
}

export function AnalysisResults({ result, originalPrompt, isSynced = true }: AnalysisResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-8 space-y-6 md:space-y-8"
    >
      {/* Overall Score Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-elevated p-5 md:p-8 text-center"
      >
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Risultato Analisi</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          <ScoreRing 
            score={result.overallScore} 
            size="lg" 
            label="Punteggio Complessivo" 
          />
          <div className="text-center md:text-left max-w-md">
            <p className="text-sm md:text-base text-muted-foreground">
              Il tuo prompt ha ottenuto un punteggio di <span className="text-primary font-semibold">{result.overallScore}/100</span>. 
              Ci sono diverse aree di miglioramento, in particolare nella definizione dei requisiti non funzionali 
              e nei vincoli tecnici.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Tabbed Content */}
      <Tabs defaultValue="dimensions" className="w-full">
        <TabsList className="w-full justify-start bg-card/50 border border-border/50 p-1 rounded-xl mb-4 md:mb-6 flex flex-wrap h-auto gap-1">
          <TabsTrigger value="dimensions" className="gap-1.5 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-2 md:px-3">
            <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Dimensioni</span>
            <span className="sm:hidden">Score</span>
          </TabsTrigger>
          <TabsTrigger value="swot" className="gap-1.5 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-2 md:px-3">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Analisi SWOT</span>
            <span className="sm:hidden">SWOT</span>
          </TabsTrigger>
          <TabsTrigger value="optimized" className="gap-1.5 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-2 md:px-3">
            <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Prompt Ottimizzato</span>
            <span className="sm:hidden">Prompt</span>
          </TabsTrigger>
          <TabsTrigger value="architecture" className="gap-1.5 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-2 md:px-3">
            <Layers className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Architettura</span>
            <span className="sm:hidden">Arch</span>
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="gap-1.5 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-2 md:px-3">
            <Rocket className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Roadmap</span>
            <span className="sm:hidden">Road</span>
          </TabsTrigger>
          <TabsTrigger value="practices" className="gap-1.5 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-2 md:px-3">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Best Practices</span>
            <span className="sm:hidden">Tips</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dimensions" className="space-y-3 md:space-y-4 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {result.dimensions.map((dim, index) => (
              <DimensionCard key={dim.id} dimension={dim} index={index} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="swot" className="mt-0">
          <StrengthsWeaknesses items={result.strengthsWeaknesses} />
        </TabsContent>
        
        <TabsContent value="optimized" className="mt-0">
          <OptimizedPrompt 
            originalPrompt={originalPrompt} 
            optimizedPrompt={result.optimizedPrompt} 
          />
        </TabsContent>
        
        <TabsContent value="architecture" className="space-y-4 md:space-y-6 mt-0">
          <SimplifiedArchitectureFromStack technologies={result.technologies} />
          <TechStackSection technologies={result.technologies} isSynced={isSynced} />
          <ArchitectureDiagramFromStack technologies={result.technologies} />
        </TabsContent>
        
        <TabsContent value="roadmap" className="mt-0">
          <ImplementationRoadmapFromStack technologies={result.technologies} />
        </TabsContent>
        
        <TabsContent value="practices" className="space-y-4 md:space-y-6 mt-0">
          <BestPracticesSection
            title="Vibe Coding Best Practices"
            subtitle="Come interagire efficacemente con l'AI per generare codice di qualità"
            practices={result.vibeCodingPractices}
            type="vibe"
          />
          <BestPracticesSection
            title="Architettura Web Best Practices"
            subtitle="Pattern e anti-pattern per progetti web moderni"
            practices={result.architecturePractices}
            type="architecture"
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
