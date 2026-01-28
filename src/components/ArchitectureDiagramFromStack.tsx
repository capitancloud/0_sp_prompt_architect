import { motion } from "framer-motion";
import { TechnologySuggestion } from "@/types/analysis";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Check, Info, ArrowRight, Zap } from "lucide-react";

interface ArchitectureDiagramFromStackProps {
  technologies: TechnologySuggestion[];
}

// Color palette for different categories
const getCategoryStyle = (category: string) => {
  const lower = category.toLowerCase();
  
  if (lower === "frontend") {
    return { gradient: "from-cyan-500 to-blue-600", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/30", textColor: "text-cyan-400" };
  }
  if (lower === "styling") {
    return { gradient: "from-pink-500 to-rose-600", bgColor: "bg-pink-500/10", borderColor: "border-pink-500/30", textColor: "text-pink-400" };
  }
  if (lower === "backend") {
    return { gradient: "from-violet-500 to-purple-600", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/30", textColor: "text-violet-400" };
  }
  if (lower === "database") {
    return { gradient: "from-amber-500 to-orange-600", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", textColor: "text-amber-400" };
  }
  if (lower === "autenticazione") {
    return { gradient: "from-emerald-500 to-green-600", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30", textColor: "text-emerald-400" };
  }
  if (lower === "hosting") {
    return { gradient: "from-indigo-500 to-blue-600", bgColor: "bg-indigo-500/10", borderColor: "border-indigo-500/30", textColor: "text-indigo-400" };
  }
  return { gradient: "from-primary to-primary-glow", bgColor: "bg-primary/10", borderColor: "border-primary/30", textColor: "text-primary" };
};

// Categorize technologies into layers for visual organization
const categorizeTechnologies = (technologies: TechnologySuggestion[]) => {
  const layers: Record<string, TechnologySuggestion[]> = {
    "Presentation Layer": [],
    "Application Layer": [],
    "Data Layer": [],
    "Infrastructure": []
  };

  technologies.forEach(tech => {
    const category = tech.category.toLowerCase();
    
    if (category === "frontend" || category === "styling") {
      layers["Presentation Layer"].push(tech);
    } else if (category === "backend" || category === "autenticazione") {
      layers["Application Layer"].push(tech);
    } else if (category === "database") {
      layers["Data Layer"].push(tech);
    } else if (category === "hosting") {
      layers["Infrastructure"].push(tech);
    }
  });

  return layers;
};

export function ArchitectureDiagramFromStack({ technologies }: ArchitectureDiagramFromStackProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const selected = technologies.find(t => t.category === selectedCategory);
  const layers = categorizeTechnologies(technologies);

  const layerLabels: Record<string, { icon: string; description: string }> = {
    "Presentation Layer": { icon: "🎨", description: "Ciò che l'utente vede e tocca" },
    "Application Layer": { icon: "⚙️", description: "La logica e l'elaborazione dei dati" },
    "Data Layer": { icon: "💾", description: "Dove i dati vengono conservati" },
    "Infrastructure": { icon: "🌐", description: "Servizi di supporto e deployment" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-4 md:p-6"
    >
      <h2 className="text-lg md:text-xl font-bold gradient-text mb-1 md:mb-2">Diagramma Architettura Completo</h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
        Visualizzazione interattiva dei 6 blocchi dello stack tecnologico organizzati per layer
      </p>
      
      <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
        {/* Layered Architecture Diagram */}
        <div className="flex-1 space-y-4">
          {Object.entries(layers).map(([layerName, layerTechs], layerIndex) => {
            if (layerTechs.length === 0) return null;
            
            return (
              <motion.div
                key={layerName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: layerIndex * 0.1 }}
                className="relative"
              >
                {/* Layer Header */}
                <div className="flex items-center gap-2 mb-2 md:mb-3 flex-wrap">
                  <span className="text-base md:text-lg">{layerLabels[layerName]?.icon}</span>
                  <h3 className="text-xs md:text-sm font-semibold text-foreground">{layerName}</h3>
                  <span className="text-[10px] md:text-xs text-muted-foreground">— {layerLabels[layerName]?.description}</span>
                </div>

                {/* Technologies in this layer */}
                <div className="relative p-3 md:p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                    {layerTechs.map((tech, index) => {
                      const style = getCategoryStyle(tech.category);
                      const isSelected = selectedCategory === tech.category;
                      
                      return (
                        <motion.div
                          key={tech.category}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => setSelectedCategory(isSelected ? null : tech.category)}
                          className={cn(
                            "relative p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all duration-300",
                            "hover:shadow-lg hover:scale-[1.02]",
                            isSelected 
                              ? `${style.bgColor} ${style.borderColor} shadow-lg` 
                              : "bg-card/50 border-border/50 hover:border-border"
                          )}
                        >
                          {/* Gradient bar on top */}
                          <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-md bg-gradient-to-r ${style.gradient}`} />
                          
                          <div className="pt-1">
                            <h4 className="font-semibold text-foreground text-xs md:text-sm mb-1">{tech.category}</h4>
                            <p className={`text-[10px] md:text-xs font-mono ${style.textColor} mb-1 md:mb-2`}>{tech.primary.name}</p>
                            <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">{tech.primary.reason}</p>
                          </div>

                          {/* Pros/Cons indicator */}
                          {tech.primary.cons.length > 0 && (
                            <div className="absolute top-3 right-3">
                              <div className="p-1 rounded-full bg-warning/20">
                                <AlertTriangle className="w-3 h-3 text-warning" />
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Arrow between layers */}
                {layerIndex < Object.entries(layers).filter(([_, techs]) => techs.length > 0).length - 1 && (
                  <div className="flex justify-center py-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-0.5 h-4 bg-gradient-to-b from-border to-primary/50" />
                      <Zap className="w-4 h-4 text-primary animate-pulse" />
                      <div className="w-0.5 h-4 bg-gradient-to-b from-primary/50 to-border" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Details panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: selectedCategory ? 1 : 0.7, x: 0 }}
          className={cn(
            "w-full xl:w-96 rounded-xl border transition-all duration-300 sticky top-4",
            selectedCategory 
              ? "bg-card border-primary/30 shadow-lg shadow-primary/5" 
              : "bg-card/50 border-border/50"
          )}
        >
          {selected ? (
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selected.category}</h3>
                  <p className={`text-sm font-mono ${getCategoryStyle(selected.category).textColor}`}>
                    {selected.primary.name}
                  </p>
                </div>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${getCategoryStyle(selected.category).gradient}`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Reason */}
                <div className="p-3 rounded-lg bg-muted/30">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Perché questa scelta?
                  </h4>
                  <p className="text-sm text-foreground">{selected.primary.reason}</p>
                </div>
                
                {/* Pros */}
                {selected.primary.pros.length > 0 && (
                  <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                    <h4 className="text-xs font-medium text-success uppercase tracking-wider mb-2">
                      Vantaggi
                    </h4>
                    <ul className="space-y-1">
                      {selected.primary.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-success mt-1">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Cons */}
                {selected.primary.cons.length > 0 && (
                  <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                    <h4 className="text-xs font-medium text-warning uppercase tracking-wider mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Potenziali Svantaggi
                    </h4>
                    <ul className="space-y-1">
                      {selected.primary.cons.map((con, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-warning mt-1">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Alternative */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <h4 className="text-xs font-medium text-primary uppercase tracking-wider mb-2 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3" />
                    Alternativa: {selected.alternative.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">{selected.alternative.reason}</p>
                  <p className="text-xs text-muted-foreground/80 italic">
                    Quando usarla: {selected.alternative.whenToUse}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                  <Info className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  Seleziona un componente
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Clicca su un box per vedere tutti i dettagli
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-4 border-t border-border/30"
      >
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="font-medium">Legenda:</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-cyan-500 to-blue-600" />
            <span>Frontend</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-pink-500 to-rose-600" />
            <span>Styling</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-violet-500 to-purple-600" />
            <span>Backend</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-amber-500 to-orange-600" />
            <span>Database</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-500 to-green-600" />
            <span>Autenticazione</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-indigo-500 to-blue-600" />
            <span>Hosting</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
