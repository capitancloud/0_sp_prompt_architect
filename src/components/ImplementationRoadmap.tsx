import { motion } from "framer-motion";
import { ArchitectureComponent } from "@/types/analysis";
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Clock, 
  AlertTriangle, 
  Zap,
  GitBranch,
  Target,
  Rocket,
  Shield,
  Database,
  Globe,
  Server,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ImplementationRoadmapProps {
  components: ArchitectureComponent[];
}

interface Milestone {
  id: string;
  phase: number;
  title: string;
  description: string;
  duration: string;
  tasks: string[];
  dependencies: string[];
  deliverables: string[];
  risks: string[];
  icon: React.ReactNode;
  color: string;
}

// Generate milestones based on architecture components
const generateMilestones = (components: ArchitectureComponent[]): Milestone[] => {
  const milestones: Milestone[] = [];
  
  // Phase 0: Setup & Planning
  milestones.push({
    id: "setup",
    phase: 0,
    title: "Setup & Pianificazione",
    description: "Configurazione dell'ambiente di sviluppo e definizione dell'architettura iniziale",
    duration: "1-2 giorni",
    tasks: [
      "Inizializzare il repository Git",
      "Configurare l'ambiente di sviluppo",
      "Definire la struttura delle cartelle",
      "Configurare ESLint, Prettier e TypeScript",
      "Creare il documento di architettura"
    ],
    dependencies: [],
    deliverables: [
      "Repository configurato",
      "Ambiente locale funzionante",
      "Documentazione iniziale"
    ],
    risks: [],
    icon: <GitBranch className="w-5 h-5" />,
    color: "from-slate-500 to-gray-600"
  });

  // Phase 1: Database & Auth (if present)
  const hasDatabase = components.some(c => 
    c.name.toLowerCase().includes('database') || 
    c.name.toLowerCase().includes('db') ||
    c.technology.toLowerCase().includes('postgres') ||
    c.technology.toLowerCase().includes('supabase')
  );
  
  const hasAuth = components.some(c => 
    c.name.toLowerCase().includes('auth') || 
    c.name.toLowerCase().includes('identity')
  );

  if (hasDatabase) {
    const dbComponent = components.find(c => 
      c.name.toLowerCase().includes('database') || 
      c.name.toLowerCase().includes('db')
    );
    
    milestones.push({
      id: "database",
      phase: 1,
      title: "Database & Schema",
      description: "Progettazione e implementazione dello schema del database",
      duration: "2-3 giorni",
      tasks: [
        "Progettare lo schema ER del database",
        "Creare le tabelle principali",
        "Definire le relazioni tra entità",
        "Implementare le migrazioni",
        "Configurare i backup automatici"
      ],
      dependencies: ["setup"],
      deliverables: [
        "Schema database completo",
        "Migrazioni funzionanti",
        "Seed data per sviluppo"
      ],
      risks: [
        "Schema non normalizzato potrebbe causare problemi futuri",
        "Mancanza di indici può degradare le performance"
      ],
      icon: <Database className="w-5 h-5" />,
      color: "from-amber-500 to-orange-600"
    });
  }

  if (hasAuth) {
    milestones.push({
      id: "auth",
      phase: hasDatabase ? 2 : 1,
      title: "Autenticazione & Sicurezza",
      description: "Implementazione del sistema di autenticazione e autorizzazione",
      duration: "2-4 giorni",
      tasks: [
        "Configurare il provider di autenticazione",
        "Implementare login/registrazione",
        "Gestire i token JWT",
        "Implementare Row Level Security (RLS)",
        "Configurare i ruoli utente"
      ],
      dependencies: hasDatabase ? ["database"] : ["setup"],
      deliverables: [
        "Sistema di login funzionante",
        "Protezione delle route",
        "Gestione sessioni"
      ],
      risks: [
        "RLS policies non testate possono esporre dati sensibili",
        "Token non gestiti correttamente creano vulnerabilità"
      ],
      icon: <Shield className="w-5 h-5" />,
      color: "from-emerald-500 to-green-600"
    });
  }

  // Phase 2/3: Backend/API
  const hasBackend = components.some(c => 
    c.name.toLowerCase().includes('backend') || 
    c.name.toLowerCase().includes('api') ||
    c.name.toLowerCase().includes('server') ||
    c.name.toLowerCase().includes('edge')
  );

  if (hasBackend) {
    const backendPhase = milestones.length;
    milestones.push({
      id: "backend",
      phase: backendPhase,
      title: "Backend & API",
      description: "Sviluppo delle API e della logica di business",
      duration: "3-5 giorni",
      tasks: [
        "Definire gli endpoint API",
        "Implementare la validazione input",
        "Creare i controller/handler",
        "Implementare la gestione errori",
        "Scrivere i test API"
      ],
      dependencies: hasAuth ? ["auth"] : hasDatabase ? ["database"] : ["setup"],
      deliverables: [
        "API documentate (OpenAPI/Swagger)",
        "Test coverage > 80%",
        "Error handling robusto"
      ],
      risks: [
        "API non versionata può rompere i client",
        "Mancanza di rate limiting espone a DoS"
      ],
      icon: <Server className="w-5 h-5" />,
      color: "from-violet-500 to-purple-600"
    });
  }

  // Phase 3/4: Frontend Core
  const hasFrontend = components.some(c => 
    c.name.toLowerCase().includes('frontend') || 
    c.name.toLowerCase().includes('ui') ||
    c.technology.toLowerCase().includes('react') ||
    c.technology.toLowerCase().includes('next')
  );

  if (hasFrontend) {
    const frontendPhase = milestones.length;
    milestones.push({
      id: "frontend-core",
      phase: frontendPhase,
      title: "Frontend Core",
      description: "Sviluppo dell'interfaccia utente principale",
      duration: "4-7 giorni",
      tasks: [
        "Configurare il design system",
        "Creare i componenti base (Button, Input, Card...)",
        "Implementare il layout principale",
        "Configurare il routing",
        "Implementare la gestione dello stato"
      ],
      dependencies: hasBackend ? ["backend"] : hasAuth ? ["auth"] : ["setup"],
      deliverables: [
        "Design system documentato",
        "Componenti riutilizzabili",
        "Layout responsive"
      ],
      risks: [
        "Componenti non accessibili escludono utenti",
        "Performance scarse su mobile"
      ],
      icon: <Globe className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-600"
    });
  }

  // Phase 4/5: Features
  const featuresPhase = milestones.length;
  milestones.push({
    id: "features",
    phase: featuresPhase,
    title: "Feature Principali",
    description: "Implementazione delle funzionalità core dell'applicazione",
    duration: "5-10 giorni",
    tasks: [
      "Implementare le feature MVP",
      "Integrare frontend e backend",
      "Gestire gli edge case",
      "Implementare feedback utente (toast, loading...)",
      "Ottimizzare le performance"
    ],
    dependencies: hasFrontend ? ["frontend-core"] : hasBackend ? ["backend"] : ["setup"],
    deliverables: [
      "MVP funzionante",
      "User flow completi",
      "Feedback visivo per ogni azione"
    ],
    risks: [
      "Scope creep può ritardare il rilascio",
      "Bug non testati in produzione"
    ],
    icon: <Layers className="w-5 h-5" />,
    color: "from-pink-500 to-rose-600"
  });

  // Phase 5/6: Testing & QA
  const testingPhase = milestones.length;
  milestones.push({
    id: "testing",
    phase: testingPhase,
    title: "Testing & QA",
    description: "Test approfonditi e controllo qualità",
    duration: "2-4 giorni",
    tasks: [
      "Scrivere test end-to-end",
      "Test di accessibilità",
      "Test di performance",
      "Security audit base",
      "Bug fixing"
    ],
    dependencies: ["features"],
    deliverables: [
      "Report test coverage",
      "Lighthouse score > 90",
      "0 vulnerabilità critiche"
    ],
    risks: [
      "Test insufficienti portano bug in produzione",
      "Mancanza di monitoring post-rilascio"
    ],
    icon: <Target className="w-5 h-5" />,
    color: "from-indigo-500 to-blue-600"
  });

  // Phase 6/7: Deploy
  const deployPhase = milestones.length;
  milestones.push({
    id: "deploy",
    phase: deployPhase,
    title: "Deploy & Lancio",
    description: "Deployment in produzione e go-live",
    duration: "1-2 giorni",
    tasks: [
      "Configurare il CI/CD",
      "Setup monitoring e alerting",
      "Configurare il dominio e SSL",
      "Deploy in staging",
      "Deploy in produzione"
    ],
    dependencies: ["testing"],
    deliverables: [
      "App in produzione",
      "Monitoring attivo",
      "Runbook per emergenze"
    ],
    risks: [
      "Downtime durante il deploy",
      "Configurazioni diverse tra staging e prod"
    ],
    icon: <Rocket className="w-5 h-5" />,
    color: "from-green-500 to-emerald-600"
  });

  return milestones;
};

export function ImplementationRoadmap({ components }: ImplementationRoadmapProps) {
  const milestones = generateMilestones(components);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedPhases);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedPhases(newCompleted);
  };

  const totalDuration = milestones.reduce((acc, m) => {
    const match = m.duration.match(/(\d+)-?(\d+)?/);
    if (match) {
      return acc + (parseInt(match[2] || match[1]));
    }
    return acc;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Rocket className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold gradient-text">Roadmap di Implementazione</h2>
            <p className="text-sm text-muted-foreground">
              Piano d'azione con milestone, dipendenze e tempistiche
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{totalDuration}+ giorni</div>
          <div className="text-xs text-muted-foreground">Durata stimata totale</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 rounded-lg bg-card/50 border border-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progresso</span>
          <span className="text-sm text-muted-foreground">
            {completedPhases.size}/{milestones.length} fasi completate
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-glow"
            initial={{ width: 0 }}
            animate={{ width: `${(completedPhases.size / milestones.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const isCompleted = completedPhases.has(milestone.id);
          const isExpanded = expandedId === milestone.id;
          const canStart = milestone.dependencies.every(dep => completedPhases.has(dep));
          
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "relative rounded-xl border transition-all duration-300",
                isCompleted 
                  ? "bg-success/5 border-success/30" 
                  : canStart 
                    ? "bg-card border-border hover:border-primary/30" 
                    : "bg-card/50 border-border/50 opacity-70"
              )}
            >
              {/* Connection line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-[27px] top-full w-0.5 h-4 bg-gradient-to-b from-border to-transparent z-10" />
              )}

              {/* Main content */}
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Phase indicator */}
                  <button
                    onClick={() => canStart && toggleComplete(milestone.id)}
                    disabled={!canStart}
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                      isCompleted 
                        ? "bg-success text-success-foreground" 
                        : `bg-gradient-to-br ${milestone.color} text-white`,
                      canStart && !isCompleted && "hover:scale-110 cursor-pointer",
                      !canStart && "cursor-not-allowed"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      milestone.icon
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                        Fase {milestone.phase}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {milestone.duration}
                      </span>
                      {!canStart && (
                        <span className="text-xs text-warning flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Richiede fasi precedenti
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>

                    {/* Dependencies */}
                    {milestone.dependencies.length > 0 && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-xs text-muted-foreground">Dipende da:</span>
                        {milestone.dependencies.map(dep => {
                          const depMilestone = milestones.find(m => m.id === dep);
                          const isDepComplete = completedPhases.has(dep);
                          return (
                            <span
                              key={dep}
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                isDepComplete 
                                  ? "bg-success/10 text-success" 
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {isDepComplete && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                              {depMilestone?.title || dep}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Expand button */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : milestone.id)}
                      className="text-xs text-primary hover:text-primary/80 mt-3 flex items-center gap-1"
                    >
                      {isExpanded ? "Nascondi dettagli" : "Mostra dettagli"}
                      <ArrowRight className={cn(
                        "w-3 h-3 transition-transform",
                        isExpanded && "rotate-90"
                      )} />
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border/50"
                  >
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Tasks */}
                      <div className="p-3 rounded-lg bg-muted/30">
                        <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                          <Circle className="w-3 h-3 text-primary" />
                          Task da completare
                        </h4>
                        <ul className="space-y-1.5">
                          {milestone.tasks.map((task, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                        <h4 className="text-xs font-semibold text-success mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3" />
                          Deliverable attesi
                        </h4>
                        <ul className="space-y-1.5">
                          {milestone.deliverables.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <Zap className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Risks */}
                      {milestone.risks.length > 0 && (
                        <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                          <h4 className="text-xs font-semibold text-warning mb-2 flex items-center gap-1.5">
                            <AlertTriangle className="w-3 h-3" />
                            Rischi da monitorare
                          </h4>
                          <ul className="space-y-1.5">
                            {milestone.risks.map((risk, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-warning mt-0.5">⚠️</span>
                                <span>{risk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
      >
        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Suggerimenti per il successo
        </h4>
        <ul className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Completa ogni fase prima di passare alla successiva
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Scrivi test mentre sviluppi, non alla fine
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Fai deploy in staging frequentemente
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Documenta le decisioni architetturali
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
