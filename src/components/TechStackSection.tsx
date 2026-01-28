import { motion } from "framer-motion";
import { TechnologySuggestion } from "@/types/analysis";
import { Check, X, ArrowRight, Lightbulb, Scale, Target, BookOpen, Zap, AlertCircle, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface TechStackCardProps {
  tech: TechnologySuggestion;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

// Fixed categories - always displayed in this order
const FIXED_CATEGORIES = ["Frontend", "Styling", "Backend", "Database", "Autenticazione", "Hosting"] as const;

const categoryIcons: Record<string, string> = {
  "Frontend": "⚛️",
  "Styling": "🎨",
  "Backend": "⚙️",
  "Database": "🗄️",
  "Autenticazione": "🔐",
  "Hosting": "☁️"
};

const categoryColors: Record<string, { gradient: string; bg: string; text: string; border: string }> = {
  "Frontend": { gradient: "from-cyan-500 to-blue-600", bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" },
  "Styling": { gradient: "from-pink-500 to-rose-600", bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/30" },
  "Backend": { gradient: "from-violet-500 to-purple-600", bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/30" },
  "Database": { gradient: "from-amber-500 to-orange-600", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  "Autenticazione": { gradient: "from-emerald-500 to-green-600", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  "Hosting": { gradient: "from-indigo-500 to-blue-600", bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/30" }
};

const getColors = (category: string) => {
  return categoryColors[category] || { gradient: "from-primary to-primary-glow", bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" };
};

export function TechStackCard({ tech, index, isExpanded, onToggle }: TechStackCardProps) {
  const colors = getColors(tech.category);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "glass-card overflow-hidden transition-all duration-300",
        isExpanded ? "col-span-full" : ""
      )}
    >
      {/* Header with gradient */}
      <div className={`h-1.5 bg-gradient-to-r ${colors.gradient}`} />
      
      <div className="p-5">
        {/* Category & Name */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center text-2xl`}>
              {categoryIcons[tech.category] || "📦"}
            </div>
            <div>
              <span className={`text-xs font-medium uppercase tracking-wider ${colors.text}`}>
                {tech.category}
              </span>
              <h3 className="text-lg font-bold text-foreground">{tech.primary?.name || "N/A"}</h3>
            </div>
          </div>
          <button
            onClick={onToggle}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              colors.bg, colors.text,
              "hover:scale-105"
            )}
          >
            {isExpanded ? "Riduci" : "Dettagli"}
          </button>
        </div>
        
        {/* Main Reason */}
        <div className={`p-4 rounded-lg ${colors.bg} border ${colors.border} mb-4`}>
          <div className="flex items-start gap-2">
            <Lightbulb className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wider ${colors.text} mb-1`}>
                Perché questa scelta?
              </h4>
              <p className="text-sm text-foreground leading-relaxed">
                {tech.primary?.reason || "Motivazione non specificata"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Pros & Cons Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-success/5 border border-success/20">
            <h4 className="text-xs font-semibold text-success mb-3 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Vantaggi
            </h4>
            <ul className="space-y-2">
              {(tech.primary?.pros || []).map((pro, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-success mt-1 flex-shrink-0">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <h4 className="text-xs font-semibold text-destructive mb-3 flex items-center gap-1.5">
              <X className="w-3.5 h-3.5" /> Svantaggi
            </h4>
            <ul className="space-y-2">
              {(tech.primary?.cons || []).map((con, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-destructive mt-1 flex-shrink-0">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Use Cases */}
            <div className="p-4 rounded-lg bg-card border border-border">
              <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-primary" /> Casi d'uso ideali
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {getCasesForTech(tech.primary?.name || "").map((useCase, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-3 h-3 text-primary" />
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Curve */}
            <div className="p-4 rounded-lg bg-card border border-border">
              <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-accent" /> Curva di apprendimento
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${colors.gradient} transition-all`}
                    style={{ width: getLearningCurve(tech.primary?.name || "") }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-16 text-right">
                  {getLearningCurveLabel(tech.primary?.name || "")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {getLearningCurveDescription(tech.primary?.name || "")}
              </p>
            </div>

            {/* Common Pitfalls */}
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
              <h4 className="text-xs font-semibold text-warning mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Errori comuni da evitare
              </h4>
              <ul className="space-y-2">
                {getPitfallsForTech(tech.primary?.name || "").map((pitfall, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-warning mt-1">⚠️</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
        
        {/* Alternative Section */}
        {tech.alternative && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Alternativa: </span>
              <span className={`font-bold ${colors.text}`}>{tech.alternative.name || "N/A"}</span>
            </div>
            
            <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-foreground">Quando sceglierla:</strong> {tech.alternative.whenToUse || "Non specificato"}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Motivazione:</strong> {tech.alternative.reason || "Non specificata"}
              </p>
            </div>
            
            {/* Comparison Table (only when expanded) */}
            {isExpanded && tech.primary?.name && tech.alternative?.name && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-primary" /> Confronto diretto
                </h5>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="text-left p-2 text-xs font-medium text-muted-foreground">Aspetto</th>
                        <th className="text-center p-2 text-xs font-medium text-primary">{tech.primary.name}</th>
                        <th className="text-center p-2 text-xs font-medium text-accent">{tech.alternative.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getComparisonData(tech.primary.name, tech.alternative.name).map((row, i) => (
                        <tr key={i} className="border-t border-border/50">
                          <td className="p-2 text-muted-foreground">{row.aspect}</td>
                          <td className="p-2 text-center">{row.primary}</td>
                          <td className="p-2 text-center">{row.alternative}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Helper functions for detailed content
function getCasesForTech(techName: string): string[] {
  const cases: Record<string, string[]> = {
    "Next.js": ["E-commerce con SEO", "Blog/CMS", "Dashboard aziendali", "SaaS multi-tenant"],
    "Next.js (App Router)": ["E-commerce con SEO", "Blog/CMS", "Dashboard aziendali", "SaaS multi-tenant"],
    "React": ["SPA complesse", "Prototipi rapidi", "App con molto stato client-side", "PWA"],
    "Vite + React": ["Prototipi rapidi", "App client-side", "Tool interni", "Landing page interattive"],
    "Supabase": ["MVP veloci", "App real-time", "Progetti con budget limitato", "Startup"],
    "Supabase (PostgreSQL)": ["MVP veloci", "App real-time", "Progetti con budget limitato", "Startup"],
    "PostgreSQL": ["Dati relazionali complessi", "Transazioni ACID", "Query avanzate", "Data integrity"],
    "MongoDB": ["Dati non strutturati", "Prototipazione rapida", "Logging", "Cache documenti"],
    "Tailwind": ["Design system custom", "Sviluppo rapido UI", "Team con designer", "Consistenza visiva"],
    "Tailwind CSS": ["Design system custom", "Sviluppo rapido UI", "Team con designer", "Consistenza visiva"],
  };
  return cases[techName] || ["Applicazioni web moderne", "Progetti scalabili", "Team distribuiti", "Sviluppo agile"];
}

function getLearningCurve(techName: string): string {
  const curves: Record<string, string> = {
    "Next.js": "70%",
    "Next.js (App Router)": "75%",
    "React": "60%",
    "Vite + React": "40%",
    "Supabase": "35%",
    "Supabase (PostgreSQL)": "40%",
    "PostgreSQL": "65%",
    "MongoDB": "45%",
    "Tailwind": "30%",
    "Tailwind CSS": "30%",
  };
  return curves[techName] || "50%";
}

function getLearningCurveLabel(techName: string): string {
  const percentage = parseInt(getLearningCurve(techName));
  if (percentage <= 35) return "Facile";
  if (percentage <= 55) return "Moderata";
  if (percentage <= 70) return "Impegnativa";
  return "Ripida";
}

function getLearningCurveDescription(techName: string): string {
  const descriptions: Record<string, string> = {
    "Next.js": "Richiede familiarità con React e comprensione di SSR/SSG. I Server Components aggiungono complessità.",
    "Next.js (App Router)": "Il nuovo App Router richiede di ripensare il mental model tradizionale di React.",
    "React": "Curva iniziale moderata, ma padroneggiare hooks e patterns avanzati richiede pratica.",
    "Vite + React": "Setup immediato, ideale per chi conosce già React.",
    "Supabase": "Dashboard intuitiva e SDK semplice. Ideale per partire velocemente.",
    "Supabase (PostgreSQL)": "Combina la semplicità di Supabase con la potenza di PostgreSQL.",
    "PostgreSQL": "Potente ma richiede conoscenza di SQL avanzato e ottimizzazione query.",
    "MongoDB": "Facile iniziare, ma gestire relazioni e consistenza richiede esperienza.",
    "Tailwind": "Veloce da imparare se conosci CSS. Le classi utility diventano naturali.",
    "Tailwind CSS": "Veloce da imparare se conosci CSS. Le classi utility diventano naturali.",
  };
  return descriptions[techName] || "Curva di apprendimento tipica per tecnologie moderne.";
}

function getPitfallsForTech(techName: string): string[] {
  const pitfalls: Record<string, string[]> = {
    "Next.js": [
      "Mischiare logica client/server senza criterio",
      "Over-fetching nei Server Components",
      "Ignorare la cache e le strategie di revalidation"
    ],
    "Next.js (App Router)": [
      "Usare 'use client' ovunque vanificando i benefici del server rendering",
      "Non gestire correttamente il loading state e gli errori",
      "Sottovalutare la complessità del data fetching"
    ],
    "React": [
      "Stato globale non necessario (overuse di Context/Redux)",
      "useEffect con dipendenze errate",
      "Componenti troppo grandi e non riutilizzabili"
    ],
    "Supabase": [
      "RLS policies troppo permissive o mancanti",
      "Non usare le Edge Functions per logica sensibile",
      "Query N+1 nel fetching dei dati"
    ],
    "Supabase (PostgreSQL)": [
      "Dimenticare di abilitare RLS sulle nuove tabelle",
      "Non creare indici per query frequenti",
      "Esporre dati sensibili nelle policies"
    ],
    "Tailwind": [
      "Classi troppo lunghe che riducono leggibilità",
      "Non estrarre componenti per pattern ripetuti",
      "Ignorare il design system e usare valori arbitrari"
    ],
    "Tailwind CSS": [
      "Classi troppo lunghe che riducono leggibilità",
      "Non estrarre componenti per pattern ripetuti",
      "Ignorare il design system e usare valori arbitrari"
    ],
  };
  return pitfalls[techName] || [
    "Non leggere la documentazione ufficiale",
    "Saltare le best practices per velocità",
    "Non testare edge cases"
  ];
}

function getComparisonData(primary: string, alternative: string): { aspect: string; primary: string; alternative: string }[] {
  // Generic comparison based on common patterns
  const comparisons: Record<string, { aspect: string; primary: string; alternative: string }[]> = {
    "Next.js-Vite + React": [
      { aspect: "SEO", primary: "✅ Eccellente", alternative: "⚠️ Limitato" },
      { aspect: "Setup", primary: "⚠️ Più complesso", alternative: "✅ Immediato" },
      { aspect: "Performance iniziale", primary: "✅ Ottima", alternative: "⚠️ Dipende" },
      { aspect: "Flessibilità", primary: "⚠️ Opinionato", alternative: "✅ Alta" },
    ],
    "Supabase (PostgreSQL)-MongoDB": [
      { aspect: "Schema", primary: "✅ Strutturato", alternative: "✅ Flessibile" },
      { aspect: "Relazioni", primary: "✅ Native", alternative: "⚠️ Manuali" },
      { aspect: "Setup", primary: "✅ Istantaneo", alternative: "⚠️ Configurazione" },
      { aspect: "Scalabilità", primary: "✅ Buona", alternative: "✅ Eccellente" },
    ],
  };
  
  const key = `${primary}-${alternative}`;
  return comparisons[key] || [
    { aspect: "Facilità d'uso", primary: "✅", alternative: "✅" },
    { aspect: "Community", primary: "🌟🌟🌟", alternative: "🌟🌟" },
    { aspect: "Documentazione", primary: "📚 Completa", alternative: "📚 Buona" },
    { aspect: "Maturità", primary: "⭐ Stabile", alternative: "⭐ In crescita" },
  ];
}

interface TechStackSectionProps {
  technologies: TechnologySuggestion[];
  isSynced?: boolean;
}

export function TechStackSection({ technologies, isSynced = true }: TechStackSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Sort technologies according to fixed category order
  const sortedTechnologies = FIXED_CATEGORIES
    .map(category => technologies.find(t => t.category === category))
    .filter((t): t is TechnologySuggestion => t !== undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold gradient-text">Stack Tecnologico Suggerito</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Tecnologie raccomandate con analisi dettagliata e confronti
            </p>
          </div>
          {isSynced ? (
            <Badge className="bg-success/20 text-success border-success/30 gap-1">
              <Link2 className="w-3 h-3" />
              Sincronizzato
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 gap-1">
              <AlertCircle className="w-3 h-3" />
              Corretto
            </Badge>
          )}
        </div>
        <div className="text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
          {sortedTechnologies.length} tecnologie
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {sortedTechnologies.map((tech, index) => (
          <TechStackCard 
            key={tech.category} 
            tech={tech} 
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
          />
        ))}
      </div>
    </motion.div>
  );
}
