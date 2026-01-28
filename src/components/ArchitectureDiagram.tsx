import { motion } from "framer-motion";
import { ArchitectureComponent } from "@/types/analysis";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface ArchitectureDiagramProps {
  components: ArchitectureComponent[];
}

export function ArchitectureDiagram({ components }: ArchitectureDiagramProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = components.find(c => c.id === selectedId);
  
  // Layout components in a grid pattern
  const getPosition = (index: number) => {
    const cols = 3;
    const row = Math.floor(index / cols);
    const col = index % cols;
    return {
      x: 80 + col * 200,
      y: 60 + row * 140
    };
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <h2 className="text-xl font-bold gradient-text mb-6">Diagramma Architettura</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* SVG Diagram */}
        <div className="flex-1 min-h-[400px] bg-card/50 rounded-lg border border-border/50 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 600 400">
            {/* Connection lines */}
            {components.map((comp) => {
              const fromPos = getPosition(components.findIndex(c => c.id === comp.id));
              return comp.connections.map((toId) => {
                const toComp = components.find(c => c.id === toId);
                if (!toComp) return null;
                const toPos = getPosition(components.findIndex(c => c.id === toId));
                return (
                  <motion.line
                    key={`${comp.id}-${toId}`}
                    x1={fromPos.x + 75}
                    y1={fromPos.y + 40}
                    x2={toPos.x + 75}
                    y2={toPos.y + 40}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                );
              });
            })}
            
            {/* Component boxes */}
            {components.map((comp, index) => {
              const pos = getPosition(index);
              const isSelected = selectedId === comp.id;
              
              return (
                <motion.g
                  key={comp.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedId(isSelected ? null : comp.id)}
                >
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width="150"
                    height="80"
                    rx="8"
                    fill={isSelected ? "hsl(var(--primary) / 0.2)" : "hsl(var(--card))"}
                    stroke={isSelected ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth={isSelected ? "2" : "1"}
                    className="transition-all duration-200"
                  />
                  <text
                    x={pos.x + 75}
                    y={pos.y + 30}
                    textAnchor="middle"
                    fill="hsl(var(--foreground))"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {comp.name}
                  </text>
                  <text
                    x={pos.x + 75}
                    y={pos.y + 50}
                    textAnchor="middle"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="10"
                  >
                    {comp.technology}
                  </text>
                  <text
                    x={pos.x + 75}
                    y={pos.y + 68}
                    textAnchor="middle"
                    fill="hsl(var(--primary))"
                    fontSize="9"
                  >
                    {comp.role.slice(0, 25)}...
                  </text>
                </motion.g>
              );
            })}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
            Clicca su un componente per i dettagli
          </div>
        </div>
        
        {/* Details panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: selectedId ? 1 : 0.5, x: 0 }}
          className={cn(
            "w-full lg:w-80 p-5 rounded-lg border transition-all",
            selectedId ? "bg-card border-primary/30" : "bg-card/50 border-border/50"
          )}
        >
          {selected ? (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-1">{selected.name}</h3>
              <p className="text-sm text-primary mb-4">{selected.technology}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Ruolo</h4>
                  <p className="text-sm text-foreground">{selected.role}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Motivazione</h4>
                  <p className="text-sm text-foreground">{selected.reason}</p>
                </div>
                
                {selected.risks.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-warning uppercase tracking-wider mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Rischi
                    </h4>
                    <ul className="space-y-1">
                      {selected.risks.map((risk, i) => (
                        <li key={i} className="text-sm text-muted-foreground">• {risk}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">
                Seleziona un componente dal diagramma per vedere i dettagli
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
