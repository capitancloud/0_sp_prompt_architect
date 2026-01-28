import { motion } from "framer-motion";
import { TechnologySuggestion } from "@/types/analysis";
import { Check, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechStackCardProps {
  tech: TechnologySuggestion;
  index: number;
}

const categoryIcons: Record<string, string> = {
  "Frontend": "⚛️",
  "Styling": "🎨",
  "Backend/AI": "🤖",
  "Database": "🗄️",
  "Autenticazione": "🔐"
};

export function TechStackCard({ tech, index }: TechStackCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="glass-card p-5 hover:bg-card/90 transition-all group"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{categoryIcons[tech.category] || "📦"}</span>
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{tech.category}</span>
          <h3 className="text-lg font-semibold text-foreground">{tech.primary.name}</h3>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        {tech.primary.reason}
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-xs font-medium text-success mb-2 flex items-center gap-1">
            <Check className="w-3 h-3" /> Pro
          </h4>
          <ul className="space-y-1">
            {tech.primary.pros.slice(0, 3).map((pro, i) => (
              <li key={i} className="text-xs text-muted-foreground">• {pro}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-medium text-destructive mb-2 flex items-center gap-1">
            <X className="w-3 h-3" /> Contro
          </h4>
          <ul className="space-y-1">
            {tech.primary.cons.slice(0, 3).map((con, i) => (
              <li key={i} className="text-xs text-muted-foreground">• {con}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Alternative */}
      <div className="pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight className="w-3 h-3 text-accent" />
          <span className="text-xs font-medium text-accent">Alternativa: {tech.alternative.name}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {tech.alternative.whenToUse}
        </p>
      </div>
    </motion.div>
  );
}

interface TechStackSectionProps {
  technologies: TechnologySuggestion[];
}

export function TechStackSection({ technologies }: TechStackSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold gradient-text mb-6">Stack Tecnologico Suggerito</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {technologies.map((tech, index) => (
          <TechStackCard key={tech.category} tech={tech} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
