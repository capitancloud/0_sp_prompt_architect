import { motion } from "framer-motion";
import { BestPractice } from "@/types/analysis";
import { ChevronDown, BookOpen, Zap, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BestPracticesSectionProps {
  title: string;
  subtitle: string;
  practices: BestPractice[];
  type: "vibe" | "architecture";
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Comunicazione": <BookOpen className="w-4 h-4" />,
  "Iterazione": <Zap className="w-4 h-4" />,
  "Validazione": <AlertTriangle className="w-4 h-4" />,
  "Contesto": <BookOpen className="w-4 h-4" />,
  "Errori Comuni": <AlertTriangle className="w-4 h-4" />,
};

export function BestPracticesSection({ title, subtitle, practices, type }: BestPracticesSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-4 md:p-6"
    >
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold gradient-text">{title}</h2>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      
      <div className="space-y-2 md:space-y-3">
        {practices.map((practice, index) => (
          <motion.div
            key={practice.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              "rounded-lg border transition-all cursor-pointer",
              expandedId === practice.id 
                ? "bg-card border-primary/30" 
                : "bg-card/50 border-border/50 hover:border-border"
            )}
            onClick={() => setExpandedId(expandedId === practice.id ? null : practice.id)}
          >
            <div className="p-3 md:p-4">
              <div className="flex items-start justify-between gap-3 md:gap-4">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className={cn(
                    "p-1.5 md:p-2 rounded-lg",
                    type === "vibe" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                  )}>
                    {categoryIcons[practice.category] || <BookOpen className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                      {practice.category}
                    </span>
                    <h3 className="font-medium text-foreground text-sm md:text-base">{practice.title}</h3>
                  </div>
                </div>
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform mt-1",
                    expandedId === practice.id && "rotate-180"
                  )} 
                />
              </div>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedId === practice.id ? "auto" : 0,
                  opacity: expandedId === practice.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 md:pt-4 pl-8 md:pl-11 space-y-3 md:space-y-4">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {practice.description}
                  </p>
                  
                  {practice.examples.length > 0 && (
                    <div className="bg-background/50 p-2.5 md:p-3 rounded-lg border border-border/50">
                      <h4 className="text-[10px] md:text-xs font-medium text-foreground mb-2">Esempi:</h4>
                      {practice.examples.map((example, i) => (
                        <p key={i} className="text-xs md:text-sm font-mono text-muted-foreground mb-1 break-all">
                          {example}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {practice.relatedIssues && practice.relatedIssues.length > 0 && (
                    <div className="flex items-start gap-2 text-xs text-warning">
                      <AlertTriangle className="w-3 h-3 mt-0.5" />
                      <span>
                        Problema correlato: {practice.relatedIssues.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
