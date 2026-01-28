import { motion } from "framer-motion";
import { StrengthWeakness } from "@/types/analysis";
import { CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrengthsWeaknessesProps {
  items: StrengthWeakness[];
}

export function StrengthsWeaknesses({ items }: StrengthsWeaknessesProps) {
  const strengths = items.filter(i => i.type === 'strength');
  const weaknesses = items.filter(i => i.type === 'weakness');
  const assumptions = items.filter(i => i.type === 'assumption');
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'strength':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'weakness':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'assumption':
        return <HelpCircle className="w-5 h-5 text-warning" />;
    }
  };
  
  const getCardClass = (type: string) => {
    switch (type) {
      case 'strength':
        return "border-success/30 bg-success/5";
      case 'weakness':
        return "border-destructive/30 bg-destructive/5";
      case 'assumption':
        return "border-warning/30 bg-warning/5";
    }
  };
  
  const renderSection = (title: string, sectionItems: StrengthWeakness[], delay: number) => (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <div className="space-y-3">
        {sectionItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + index * 0.1 }}
            className={cn(
              "p-4 rounded-lg border transition-all hover:scale-[1.02]",
              getCardClass(item.type)
            )}
          >
            <div className="flex items-start gap-3">
              {getIcon(item.type)}
              <div>
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-4 md:p-6"
    >
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 gradient-text">Analisi Punti di Forza e Debolezza</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {renderSection("Punti di Forza", strengths, 0.2)}
        {renderSection("Debolezze", weaknesses, 0.4)}
        {renderSection("Assunzioni Implicite", assumptions, 0.6)}
      </div>
    </motion.div>
  );
}
