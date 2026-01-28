import { motion } from "framer-motion";
import { ArchitectureComponent } from "@/types/analysis";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Check, Info, ArrowRight, Zap } from "lucide-react";

interface ArchitectureDiagramEnhancedProps {
  components: ArchitectureComponent[];
}

// Color palette for different component types
const getComponentStyle = (name: string, technology: string) => {
  const lowerName = name.toLowerCase();
  const lowerTech = technology.toLowerCase();
  
  if (lowerName.includes('frontend') || lowerName.includes('next') || lowerName.includes('react') || lowerTech.includes('react')) {
    return { gradient: "from-cyan-500 to-blue-600", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/30", textColor: "text-cyan-400" };
  }
  if (lowerName.includes('auth') || lowerName.includes('identity')) {
    return { gradient: "from-emerald-500 to-green-600", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30", textColor: "text-emerald-400" };
  }
  if (lowerName.includes('database') || lowerName.includes('db') || lowerTech.includes('postgres')) {
    return { gradient: "from-amber-500 to-orange-600", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", textColor: "text-amber-400" };
  }
  if (lowerName.includes('backend') || lowerName.includes('api') || lowerName.includes('edge') || lowerName.includes('server')) {
    return { gradient: "from-violet-500 to-purple-600", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/30", textColor: "text-violet-400" };
  }
  if (lowerName.includes('storage') || lowerName.includes('file') || lowerName.includes('cdn')) {
    return { gradient: "from-pink-500 to-rose-600", bgColor: "bg-pink-500/10", borderColor: "border-pink-500/30", textColor: "text-pink-400" };
  }
  if (lowerName.includes('cache') || lowerName.includes('redis')) {
    return { gradient: "from-red-500 to-orange-600", bgColor: "bg-red-500/10", borderColor: "border-red-500/30", textColor: "text-red-400" };
  }
  return { gradient: "from-primary to-primary-glow", bgColor: "bg-primary/10", borderColor: "border-primary/30", textColor: "text-primary" };
};

// Categorize components into layers
const categorizeComponents = (components: ArchitectureComponent[]) => {
  const layers: Record<string, ArchitectureComponent[]> = {
    "Presentation Layer": [],
    "Application Layer": [],
    "Data Layer": [],
    "Infrastructure": []
  };

  components.forEach(comp => {
    const lowerName = comp.name.toLowerCase();
    const lowerTech = comp.technology.toLowerCase();
    
    if (lowerName.includes('frontend') || lowerName.includes('next') || lowerName.includes('react') || lowerTech.includes('react')) {
      layers["Presentation Layer"].push(comp);
    } else if (lowerName.includes('auth') || lowerName.includes('api') || lowerName.includes('backend') || lowerName.includes('edge') || lowerName.includes('server')) {
      layers["Application Layer"].push(comp);
    } else if (lowerName.includes('database') || lowerName.includes('db') || lowerName.includes('storage') || lowerName.includes('cache')) {
      layers["Data Layer"].push(comp);
    } else {
      layers["Infrastructure"].push(comp);
    }
  });

  return layers;
};

export function ArchitectureDiagramEnhanced({ components }: ArchitectureDiagramEnhancedProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = components.find(c => c.id === selectedId);
  const layers = categorizeComponents(components);

  const layerLabels: Record<string, { icon: string; description: string }> = {
    "Presentation Layer": { icon: "🎨", description: "Ciò che l'utente vede e tocca" },
    "Application Layer": { icon: "⚙️", description: "La logica e l'elaborazione dei dati" },
    "Data Layer": { icon: "💾", description: "Dove i dati vengono conservati" },
    "Infrastructure": { icon: "🌐", description: "Servizi di supporto e infrastruttura" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <h2 className="text-xl font-bold gradient-text mb-2">Diagramma Architettura Completo</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Visualizzazione interattiva di tutti i componenti e le loro connessioni
      </p>
      
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Layered Architecture Diagram */}
        <div className="flex-1 space-y-4">
          {Object.entries(layers).map(([layerName, layerComponents], layerIndex) => {
            if (layerComponents.length === 0) return null;
            
            return (
              <motion.div
                key={layerName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: layerIndex * 0.1 }}
                className="relative"
              >
                {/* Layer Header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{layerLabels[layerName]?.icon}</span>
                  <h3 className="text-sm font-semibold text-foreground">{layerName}</h3>
                  <span className="text-xs text-muted-foreground">— {layerLabels[layerName]?.description}</span>
                </div>

                {/* Components in this layer */}
                <div className="relative p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {layerComponents.map((comp, index) => {
                      const style = getComponentStyle(comp.name, comp.technology);
                      const isSelected = selectedId === comp.id;
                      
                      return (
                        <motion.div
                          key={comp.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => setSelectedId(isSelected ? null : comp.id)}
                          className={cn(
                            "relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300",
                            "hover:shadow-lg hover:scale-[1.02]",
                            isSelected 
                              ? `${style.bgColor} ${style.borderColor} shadow-lg` 
                              : "bg-card/50 border-border/50 hover:border-border"
                          )}
                        >
                          {/* Gradient bar on top */}
                          <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-md bg-gradient-to-r ${style.gradient}`} />
                          
                          <div className="pt-1">
                            <h4 className="font-semibold text-foreground text-sm mb-1">{comp.name}</h4>
                            <p className={`text-xs font-mono ${style.textColor} mb-2`}>{comp.technology}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{comp.role}</p>
                          </div>

                          {/* Connection indicators */}
                          {comp.connections.length > 0 && (
                            <div className="mt-3 pt-2 border-t border-border/30">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <ArrowRight className="w-3 h-3" />
                                <span>{comp.connections.length} connessioni</span>
                              </div>
                            </div>
                          )}

                          {/* Risk indicator */}
                          {comp.risks.length > 0 && (
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
                {layerIndex < Object.entries(layers).filter(([_, comps]) => comps.length > 0).length - 1 && (
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
          animate={{ opacity: selectedId ? 1 : 0.7, x: 0 }}
          className={cn(
            "w-full xl:w-96 rounded-xl border transition-all duration-300 sticky top-4",
            selectedId 
              ? "bg-card border-primary/30 shadow-lg shadow-primary/5" 
              : "bg-card/50 border-border/50"
          )}
        >
          {selected ? (
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selected.name}</h3>
                  <p className={`text-sm font-mono ${getComponentStyle(selected.name, selected.technology).textColor}`}>
                    {selected.technology}
                  </p>
                </div>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${getComponentStyle(selected.name, selected.technology).gradient}`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Role */}
                <div className="p-3 rounded-lg bg-muted/30">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Ruolo nel Sistema
                  </h4>
                  <p className="text-sm text-foreground">{selected.role}</p>
                </div>
                
                {/* Reason */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <h4 className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
                    Perché questa scelta?
                  </h4>
                  <p className="text-sm text-foreground">{selected.reason}</p>
                </div>
                
                {/* Connections */}
                {selected.connections.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Connesso a
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.connections.map((connId) => {
                        const connComp = components.find(c => c.id === connId);
                        if (!connComp) return null;
                        const style = getComponentStyle(connComp.name, connComp.technology);
                        return (
                          <button
                            key={connId}
                            onClick={() => setSelectedId(connId)}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium transition-all",
                              style.bgColor,
                              style.textColor,
                              "hover:scale-105"
                            )}
                          >
                            {connComp.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Risks */}
                {selected.risks.length > 0 && (
                  <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                    <h4 className="text-xs font-medium text-warning uppercase tracking-wider mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Potenziali Rischi
                    </h4>
                    <ul className="space-y-1">
                      {selected.risks.map((risk, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-warning mt-1">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
            <div className="w-3 h-3 rounded bg-gradient-to-r from-violet-500 to-purple-600" />
            <span>Backend/API</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-500 to-green-600" />
            <span>Autenticazione</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-amber-500 to-orange-600" />
            <span>Database</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-pink-500 to-rose-600" />
            <span>Storage</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
