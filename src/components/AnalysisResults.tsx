import { motion } from "framer-motion";
import { AnalysisResult } from "@/types/analysis";
import { ScoreRing } from "./ScoreRing";
import { DimensionCard } from "./DimensionCard";
import { StrengthsWeaknesses } from "./StrengthsWeaknesses";
import { OptimizedPrompt } from "./OptimizedPrompt";
import { TechStackSection } from "./TechStackSection";
import { ArchitectureDiagramEnhanced } from "./ArchitectureDiagramEnhanced";
import { SimplifiedArchitecture } from "./SimplifiedArchitecture";
import { ImplementationRoadmap } from "./ImplementationRoadmap";
import { BestPracticesSection } from "./BestPracticesSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Sparkles, Layers, Code2, BookOpen, Rocket } from "lucide-react";

interface AnalysisResultsProps {
  result: AnalysisResult;
  originalPrompt: string;
}

export function AnalysisResults({ result, originalPrompt }: AnalysisResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Overall Score Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-elevated p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6">Risultato Analisi</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <ScoreRing 
            score={result.overallScore} 
            size="lg" 
            label="Punteggio Complessivo" 
          />
          <div className="text-left max-w-md">
            <p className="text-muted-foreground">
              Il tuo prompt ha ottenuto un punteggio di <span className="text-primary font-semibold">{result.overallScore}/100</span>. 
              Ci sono diverse aree di miglioramento, in particolare nella definizione dei requisiti non funzionali 
              e nei vincoli tecnici.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Tabbed Content */}
      <Tabs defaultValue="dimensions" className="w-full">
        <TabsList className="w-full justify-start bg-card/50 border border-border/50 p-1 rounded-xl mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="dimensions" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
            <BarChart3 className="w-4 h-4" />
            Dimensioni
          </TabsTrigger>
          <TabsTrigger value="swot" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
            <Sparkles className="w-4 h-4" />
            Analisi SWOT
          </TabsTrigger>
          <TabsTrigger value="optimized" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
            <Code2 className="w-4 h-4" />
            Prompt Ottimizzato
          </TabsTrigger>
          <TabsTrigger value="architecture" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
            <Layers className="w-4 h-4" />
            Architettura
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
            <Rocket className="w-4 h-4" />
            Roadmap
          </TabsTrigger>
          <TabsTrigger value="practices" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
            <BookOpen className="w-4 h-4" />
            Best Practices
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dimensions" className="space-y-4 mt-0">
          <div className="grid md:grid-cols-2 gap-4">
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
        
        <TabsContent value="architecture" className="space-y-6 mt-0">
          <SimplifiedArchitecture components={result.architecture} />
          <TechStackSection technologies={result.technologies} />
          <ArchitectureDiagramEnhanced components={result.architecture} />
        </TabsContent>
        
        <TabsContent value="roadmap" className="mt-0">
          <ImplementationRoadmap components={result.architecture} />
        </TabsContent>
        
        <TabsContent value="practices" className="space-y-6 mt-0">
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
