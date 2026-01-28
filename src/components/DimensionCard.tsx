import { motion } from "framer-motion";
import { AnalysisDimension } from "@/types/analysis";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DimensionCardProps {
  dimension: AnalysisDimension;
  index: number;
}

export function DimensionCard({ dimension, index }: DimensionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const percentage = (dimension.score / dimension.maxScore) * 100;
  
  const getScoreColor = () => {
    if (percentage >= 80) return "bg-success";
    if (percentage >= 60) return "bg-primary";
    if (percentage >= 40) return "bg-warning";
    return "bg-destructive";
  };
  
  const getScoreBadgeClass = () => {
    if (percentage >= 80) return "bg-success/20 text-success border-success/30";
    if (percentage >= 60) return "bg-primary/20 text-primary border-primary/30";
    if (percentage >= 40) return "bg-warning/20 text-warning border-warning/30";
    return "bg-destructive/20 text-destructive border-destructive/30";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card p-4 md:p-5 hover:bg-card/90 transition-colors cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <span className="text-xl md:text-2xl">{dimension.icon}</span>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2 gap-2">
            <h3 className="font-semibold text-foreground text-sm md:text-base truncate">{dimension.name}</h3>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <span className={cn(
                "px-2 py-0.5 md:px-2.5 md:py-1 rounded-md text-xs md:text-sm font-medium border",
                getScoreBadgeClass()
              )}>
                {dimension.score}/{dimension.maxScore}
              </span>
              <ChevronDown 
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  isExpanded && "rotate-180"
                )} 
              />
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="score-bar mb-3">
            <motion.div
              className={cn("score-fill", getScoreColor())}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {dimension.reasoning}
          </p>
          
          {/* Expanded content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              {dimension.missing.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Cosa manca:</h4>
                  <ul className="space-y-1">
                    {dimension.missing.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {dimension.improvements.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Suggerimenti:</h4>
                  <ul className="space-y-1">
                    {dimension.improvements.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-success mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
